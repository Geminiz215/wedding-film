// Semua animasi scroll: Lenis smooth scroll + GSAP ScrollTrigger.
// Elemen dicari lewat class/id (mis. .scene-card, .dof-still) yang dipasang di komponen.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

export function scrollToHero() {
  lenis?.scrollTo('#hero', { duration: 2.2 });
}

// Dipanggil saat layar countdown (film leader) selesai
export function playHeroEntrance() {
  gsap.fromTo(
    '.hero-reveal',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, stagger: 0.16, ease: 'power3.out' }
  );
}

// Timecode di header: 00:MM:SS:FF sesuai progres scroll (~2m25s reel)
function updateReelTimecode(progress = 0) {
  const tcEl = document.getElementById('reel-timecode');
  if (!tcEl) return;
  const totalFrames = Math.floor(progress * 24 * 145);
  const frames = String(totalFrames % 24).padStart(2, '0');
  const totalSeconds = Math.floor(totalFrames / 24);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
  tcEl.textContent = `00:${minutes}:${seconds}:${frames}`;
}

// Pasang smooth scroll + semua animasi. Mengembalikan fungsi cleanup.
export function initCinematicScroll() {
  lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    updateReelTimecode(e.progress);
  });

  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = gsap.context(() => {
    if (!prefersReducedMotion) initScrollAnimations();
  });

  return () => {
    ctx.revert();
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

function initScrollAnimations() {
  const isMobile = window.innerWidth < 768;
  const maxTiltDeg = isMobile ? 4 : 10;

  // ---------- HERO: parallax berlapis & kartu judul tenggelam ke belakang ----------
  const heroTl = gsap.timeline({
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
  });

  // Background moves slowest & scales slightly
  heroTl.to('#hero-bg-layer', { yPercent: isMobile ? 12 : 24, scale: 1.08, ease: 'none' }, 0);

  // Midground frame moves medium speed
  heroTl.to('#hero-mid-layer', { yPercent: isMobile ? -8 : -16, z: -80, opacity: 0.15, ease: 'none' }, 0);

  // Foreground title card sinks backward in 3D space
  heroTl.to(
    '#hero-title-card',
    {
      z: isMobile ? -140 : -320,
      yPercent: -12,
      rotateX: maxTiltDeg * 0.65,
      opacity: 0.08,
      filter: 'blur(4px)',
      ease: 'none',
    },
    0
  );

  // ---------- OPENING CREDITS & SUBTITLE REVEAL ----------
  gsap.utils.toArray('.reveal-block').forEach((block) => {
    gsap.fromTo(
      block,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  });

  gsap.utils.toArray('.subtitle-line').forEach((line, idx) => {
    gsap.fromTo(
      line,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 14, opacity: 0.2 },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        y: 0,
        opacity: 1,
        duration: 1.35,
        delay: idx * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 86%', toggleActions: 'play none none reverse' },
      }
    );
  });

  // ---------- SCENE CARDS: miring 3D lalu tegak saat discroll ----------
  gsap.utils.toArray('.scene-card').forEach((card, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      card,
      { rotateX: maxTiltDeg, rotateY: -dir * (maxTiltDeg * 0.75), z: -90, y: 60, opacity: 0.25 },
      {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 90%', end: 'center 55%', scrub: 1 },
      }
    );
  });

  // Parallax gambar di dalam scene
  gsap.utils.toArray('.scene-parallax-img').forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.14, yPercent: -6 },
      {
        scale: 1.04,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  // ---------- GALLERY: efek depth-of-field (blur → fokus → blur) ----------
  gsap.utils.toArray('.dof-still').forEach((still, idx) => {
    const tiltY = idx % 2 === 0 ? maxTiltDeg * 0.5 : -(maxTiltDeg * 0.5);

    gsap
      .timeline({
        scrollTrigger: { trigger: still, start: 'top 95%', end: 'bottom 5%', scrub: 1 },
      })
      .fromTo(
        still,
        { scale: 0.86, rotateX: maxTiltDeg * 0.8, rotateY: tiltY, filter: 'blur(7px)', opacity: 0.25, y: 50 },
        { scale: 1, rotateX: 0, rotateY: 0, filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
      .to(still, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 0.25 })
      .to(still, {
        scale: 0.93,
        rotateX: -maxTiltDeg * 0.5,
        filter: 'blur(4px)',
        opacity: 0.45,
        y: -30,
        duration: 0.3,
        ease: 'power2.in',
      });
  });

  // ---------- CLOSING: "FIN." fade-in ----------
  gsap.fromTo(
    '#fin-card',
    { scale: 0.88, opacity: 0, filter: 'blur(6px)' },
    {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'power2.out',
      scrollTrigger: { trigger: '#closing', start: 'top 75%', end: 'center center', scrub: 1 },
    }
  );
}
