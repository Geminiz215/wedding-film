// Navigasi atas + timecode (angkanya diisi oleh lib/cinematicScroll.js saat scroll).
const NAV_LINKS = [
  { href: '#credits', label: 'PROLOGUE' },
  { href: '#story', label: 'SCENES' },
  { href: '#gallery', label: 'STILLS' },
  { href: '#schedule', label: 'THE DAY' },
  { href: '#rsvp', label: 'CREDITS & RSVP' },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-5 md:px-12 py-5 flex items-center justify-between mix-blend-difference pointer-events-none">
      <a
        href="#hero"
        className="pointer-events-auto text-[10px] md:text-[11px] tracking-wideCredit uppercase text-film-cream/85 hover:text-film-gold transition-colors"
      >
        A &amp; B <span className="text-film-gold mx-1.5">—</span> MMXXVI
      </a>

      <nav className="hidden md:flex items-center gap-8 pointer-events-auto text-[10px] tracking-credit uppercase text-film-muted/80">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="credit-link py-1 hover:text-film-goldLight transition-colors">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="pointer-events-auto flex items-center gap-3">
        <span className="hidden sm:inline text-[10px] tracking-credit uppercase text-film-muted/60">REEL</span>
        <span id="reel-timecode" className="font-mono text-[11px] tracking-widest text-film-gold">
          00:00:00:00
        </span>
      </div>
    </header>
  );
}
