'use client';

// SECTION 7: CLOSING — "FIN."
import { bride, groom, dates } from '@/data/wedding';
import { scrollToHero } from '@/lib/cinematicScroll';

export default function Closing() {
  return (
    <footer id="closing" className="relative min-h-[85vh] flex flex-col items-center justify-between py-24 px-6 border-t border-film-gold/20 overflow-hidden">
      {/* Top Credit Roll Note */}
      <div className="text-center space-y-2 z-10">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-muted/60">NO STUNT DOUBLES WERE USED IN THE MAKING OF THIS LOVE STORY</p>
        <p className="text-[10px] tracking-credit uppercase text-film-gold/75">SHOT ENTIRELY ON LOCATION IN JAKARTA &amp; BANDUNG</p>
      </div>

      {/* Center "FIN." Title Card */}
      <div id="fin-card" className="text-center my-auto py-16 px-8 max-w-2xl mx-auto z-10">
        <div className="w-16 h-[1px] bg-film-gold/50 mx-auto mb-8"></div>
        <p className="font-serif italic text-xl md:text-2xl text-film-muted mb-3">And so the new reel begins...</p>
        <h2 className="font-serif text-7xl sm:text-8xl md:text-9xl text-film-gold tracking-poster uppercase font-normal projector-flicker">FIN.</h2>
        <p className="text-[11px] tracking-wideCredit uppercase text-film-cream/80 mt-6">
          {bride.name} &amp; {groom.name} — {dates.closing}
        </p>
        <div className="w-16 h-[1px] bg-film-gold/50 mx-auto mt-8"></div>

        <div className="mt-12">
          <button
            type="button"
            onClick={scrollToHero}
            className="credit-link py-2 text-[11px] tracking-wideCredit uppercase text-film-goldLight hover:text-film-gold"
          >
            ↑ REPLAY REEL FROM BEGINNING
          </button>
        </div>
      </div>

      {/* Bottom Copyright & Rating Stamp */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] tracking-wideCredit uppercase text-film-muted/50 z-10">
        <div className="flex items-center gap-3 border border-film-gold/25 px-3 py-1.5 rounded-sm">
          <span className="font-serif text-sm text-film-gold font-bold">R</span>
          <span>RATED ROMANTIC FOR UNCONDITIONAL DEVOTION</span>
        </div>
        <span>
          © MMXXVI {bride.name} &amp; {groom.name} PICTURES. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
