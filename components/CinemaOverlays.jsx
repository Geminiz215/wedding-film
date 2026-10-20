'use client';

// Lapisan efek di atas seluruh halaman: film grain, light leak, vignette, dan kursor emas.
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function useFilmGrain(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    function renderGrain() {
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const shade = (Math.random() * 255) | 0;
        // Warm sepia-tinted grain pixel
        buffer[i] = (255 << 24) | ((shade * 0.7) << 16) | ((shade * 0.85) << 8) | shade;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderGrain();
      return;
    }
    const interval = setInterval(renderGrain, 90);
    return () => clearInterval(interval);
  }, [canvasRef]);
}

function useGoldenCursor(dotRef, ringRef) {
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    const onMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };
    const grow = () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = '#F2CC6B';
      ring.style.backgroundColor = 'rgba(232, 184, 75, 0.1)';
    };
    const shrink = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(232, 184, 75, 0.45)';
      ring.style.backgroundColor = 'transparent';
    };

    window.addEventListener('mousemove', onMove);
    const els = document.querySelectorAll('a, button, input, select, textarea, .film-photo-wrap');
    els.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, [dotRef, ringRef]);
}

export default function CinemaOverlays() {
  const grainRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useFilmGrain(grainRef);
  useGoldenCursor(dotRef, ringRef);

  return (
    <>
      {/* Animated Canvas Film Grain */}
      <canvas ref={grainRef} className="fixed inset-0 pointer-events-none z-50 opacity-[0.06] mix-blend-overlay"></canvas>

      {/* Soft Warm Light Leak & Dark Vignette */}
      <div className="light-leak-overlay"></div>
      <div className="cinematic-vignette"></div>

      {/* Custom Golden Dot Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-film-gold rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_10px_#E8B84B]"
      ></div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-film-gold/45 rounded-full pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[width,height,border-color,background-color] duration-300"
      ></div>
    </>
  );
}
