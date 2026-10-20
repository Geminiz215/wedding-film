'use client';

// Layar pembuka: hitung mundur film 35mm (3-2-1) + tombol masuk.
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { playLeaderBeep } from '@/lib/filmScore';
import { playHeroEntrance } from '@/lib/cinematicScroll';
import { getGuestName } from '@/lib/guest';

function SprocketColumn({ side }) {
  return (
    <div
      className={`absolute ${side} top-0 bottom-0 w-4 md:w-6 flex flex-col justify-between py-4 opacity-25 pointer-events-none`}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="w-full h-6 border border-film-gold/60 rounded-sm"></div>
      ))}
    </div>
  );
}

export default function FilmLeader({ onEnter }) {
  const leaderRef = useRef(null);
  const timerRef = useRef(null);
  const exitedRef = useRef(false);
  const [digit, setDigit] = useState('3');
  const [status, setStatus] = useState('THREADING 35MM REEL...');
  const [guest, setGuest] = useState('Honored Guest & Partner');

  useEffect(() => {
    const name = getGuestName();
    if (name) setGuest(name);

    let count = 3;
    timerRef.current = setInterval(() => {
      count--;
      if (count >= 1) {
        setDigit(String(count));
        playLeaderBeep(880, 0.07);
      } else {
        clearInterval(timerRef.current);
        setDigit('●');
        setStatus('REEL READY FOR PROJECTION');
      }
    }, 900);
    return () => clearInterval(timerRef.current);
  }, []);

  function exit(withAudio) {
    if (exitedRef.current) return;
    exitedRef.current = true;
    clearInterval(timerRef.current);
    onEnter(withAudio);

    gsap.to(leaderRef.current, {
      opacity: 0,
      scale: 1.06,
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        leaderRef.current.style.display = 'none';
        playHeroEntrance();
      },
    });
  }

  return (
    <div
      ref={leaderRef}
      id="film-leader"
      className="fixed inset-0 z-[100] bg-[#120C07] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Film Sprocket Holes Left & Right */}
      <SprocketColumn side="left-3 md:left-6" />
      <SprocketColumn side="right-3 md:right-6" />

      {/* Top Technical Metadata */}
      <div className="absolute top-6 md:top-10 inset-x-12 flex justify-between items-center text-[10px] tracking-wideCredit uppercase text-film-muted/60">
        <span>KODAK 2383 PRINT FILM // REEL 01</span>
        <span className="hidden sm:inline">ASPECT RATIO 2.39:1 SCOPE</span>
        <span>HEAD LEADER — SYNC POP</span>
      </div>

      {/* Center 35mm Leader Crosshair & Countdown */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line x1="0" y1="100" x2="200" y2="100" stroke="#E8B84B" strokeWidth="0.6" strokeOpacity="0.45" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#E8B84B" strokeWidth="0.6" strokeOpacity="0.45" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#E8B84B" strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="#D9C3A0" strokeWidth="0.75" strokeDasharray="4 3" strokeOpacity="0.55" />
          <circle cx="100" cy="100" r="18" fill="none" stroke="#E8B84B" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Rotating Sweep Line */}
          <g className="leader-sweep">
            <line x1="100" y1="100" x2="100" y2="12" stroke="#F2CC6B" strokeWidth="1.5" />
            <path d="M100,100 L100,12 A88,88 0 0,0 45,32 Z" fill="url(#sweepGrad)" opacity="0.25" />
          </g>
          <defs>
            <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1A120B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <span className="absolute font-serif text-7xl md:text-8xl text-film-gold tracking-tighter font-normal projector-flicker">
          {digit}
        </span>
      </div>

      {/* Guest Invitation Ticket / Enter Theatre Controls */}
      <div className="mt-6 text-center px-6 max-w-md z-10">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-muted/70 mb-2">SPECIAL SCREENING INVITATION FOR</p>
        <p className="font-serif italic text-xl md:text-2xl text-film-goldLight mb-6 tracking-wider">{guest}</p>

        <div className="text-[11px] tracking-credit uppercase text-film-cream/80 mb-5">{status}</div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-90 transition-opacity duration-500">
          <button
            onClick={() => exit(true)}
            className="px-6 py-3 border border-film-gold/70 bg-film-gold/10 hover:bg-film-gold hover:text-film-bg text-film-goldLight text-[11px] tracking-wideCredit uppercase transition-all duration-500 rounded-sm"
          >
            ENTER THEATRE (WITH SOUND)
          </button>
          <button
            onClick={() => exit(false)}
            className="px-4 py-2 text-[10px] tracking-credit uppercase text-film-muted/70 hover:text-film-cream credit-link"
          >
            CONTINUE SILENTLY
          </button>
        </div>
      </div>

      {/* Bottom Technical Stamp */}
      <div className="absolute bottom-6 md:bottom-10 inset-x-12 flex justify-between items-center text-[10px] tracking-credit uppercase text-film-muted/50">
        <span>PICTURE START</span>
        <span>24 FPS // WARM ANALOG</span>
      </div>
    </div>
  );
}
