// SECTION 1: HERO — "TITLE CARD"
import FilmImage from '@/components/FilmImage';
import { bride, groom, dates, venue, hero } from '@/data/wedding';

export default function Hero() {
  return (
    <section id="hero" className="relative h-[115vh] w-full overflow-hidden perspective-stage flex items-center justify-center">
      {/* Layer 1: Deep Background Landscape with 3D Parallax */}
      <div id="hero-bg-layer" className="absolute inset-[-8%] z-0 preserve-3d">
        <FilmImage {...hero.background} lazy={false} className="w-full h-full object-cover film-photo scale-110" />
        {/* Warm Analog Color Wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/70 via-[#1A120B]/45 to-[#1A120B]"></div>
        <div className="absolute inset-0 bg-[#2B1D12]/35 mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Midground Couple Photo Frame */}
      <div id="hero-mid-layer" className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center preserve-3d">
        <div className="w-[88vw] md:w-[66vw] h-[68vh] border border-film-gold/15 rounded-sm relative overflow-hidden opacity-45">
          <FilmImage
            {...hero.couplePhoto}
            lazy={false}
            className="w-full h-full object-cover film-photo mix-blend-luminosity opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-[#1A120B]/80"></div>
        </div>
      </div>

      {/* Layer 3: Foreground Title Card (sinks backward on scroll) */}
      <div id="hero-title-card" className="relative z-20 text-center px-6 max-w-5xl mx-auto preserve-3d">
        <div className="overflow-hidden mb-5">
          <p className="hero-reveal text-[10px] md:text-xs tracking-wideCredit uppercase text-film-muted/90">
            AN INTIMATE MOTION PICTURE PRODUCTION
          </p>
        </div>

        {/* Classic Movie Title Card with Golden Hairlines */}
        <div className="py-6 md:py-10 border-t border-b border-film-gold/55 relative">
          {/* Corner Frame Marks */}
          <span className="absolute -top-1 left-0 w-2 h-2 border-t border-l border-film-gold"></span>
          <span className="absolute -top-1 right-0 w-2 h-2 border-t border-r border-film-gold"></span>
          <span className="absolute -bottom-1 left-0 w-2 h-2 border-b border-l border-film-gold"></span>
          <span className="absolute -bottom-1 right-0 w-2 h-2 border-b border-r border-film-gold"></span>

          <p className="hero-reveal font-serif italic text-film-goldLight/90 text-base md:text-xl tracking-widest mb-2">
            {hero.tagline}
          </p>

          <h1 className="hero-reveal font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[6.2rem] text-film-gold tracking-poster uppercase font-normal leading-none my-3 projector-flicker">
            {bride.name} <span className="font-serif italic font-light text-film-cream text-3xl sm:text-5xl md:text-6xl align-middle mx-1 md:mx-3">&amp;</span> {groom.name}
          </h1>

          <p className="hero-reveal text-[10px] md:text-xs tracking-wideCredit uppercase text-film-cream/80 mt-4">
            WRITTEN BY TIME &nbsp;•&nbsp; DIRECTED BY DESTINY
          </p>
        </div>

        {/* Release Date & Location */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="hero-reveal inline-flex items-center gap-4 px-5 py-1.5 border border-film-gold/30 bg-film-bg/50 backdrop-blur-sm rounded-sm">
            <span className="text-[10px] tracking-wideCredit uppercase text-film-muted">PREMIERING</span>
            <span className="w-1 h-1 rounded-full bg-film-gold"></span>
            <span className="font-serif text-lg md:text-xl tracking-[0.3em] text-film-goldLight">{dates.hero}</span>
          </div>
          <p className="hero-reveal text-[10px] tracking-wideCredit uppercase text-film-muted/75 mt-1">{venue.heroLine}</p>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center pointer-events-none">
        <span className="text-[9px] tracking-wideCredit uppercase text-film-muted/60 mb-2">ROLL CREDITS</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-film-gold/80 to-transparent"></div>
      </div>
    </section>
  );
}
