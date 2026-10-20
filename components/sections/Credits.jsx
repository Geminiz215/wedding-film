// SECTION 2: OPENING CREDITS (mempelai & orang tua) + kutipan
import { bride, groom, families, quote } from '@/data/wedding';

function CastCredit({ role, person, align }) {
  return (
    <div className={`text-center ${align} space-y-2 reveal-block`}>
      <p className="text-[10px] tracking-wideCredit uppercase text-film-gold">{role}</p>
      <h3 className="font-serif text-3xl md:text-4xl text-film-cream tracking-wider">{person.name}</h3>
      <p className="text-[11px] tracking-credit uppercase text-film-muted/75 leading-relaxed pt-1">
        {person.childOf}
        <br />
        {person.parents}
      </p>
    </div>
  );
}

export default function Credits() {
  return (
    <section id="credits" className="relative py-28 md:py-44 px-6 md:px-16 max-w-5xl mx-auto">
      <div className="text-center space-y-16">
        {/* Film Billing Block Header */}
        <div className="space-y-3 reveal-block">
          <p className="text-[10px] tracking-wideCredit uppercase text-film-gold/80">OPENING CREDITS // REEL 01</p>
          <h2 className="text-xs md:text-sm tracking-wideCredit uppercase text-film-cream font-light">
            A FILM BY {bride.name} &amp; {groom.name}
          </h2>
          <p className="text-[10px] tracking-credit uppercase text-film-muted/65">IN ASSOCIATION WITH {families}</p>
        </div>

        {/* Starring Cast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-6 border-t border-b border-film-gold/20 py-12">
          <CastCredit role="LEADING LADY" person={bride} align="md:text-right" />
          <CastCredit role="LEADING MAN" person={groom} align="md:text-left" />
        </div>

        {/* Cinema Subtitle Quote Reveal */}
        <div className="max-w-3xl mx-auto pt-8 space-y-6">
          <div className="space-y-2 font-serif italic text-2xl sm:text-3xl md:text-4xl text-film-goldLight leading-relaxed">
            {quote.lines.map((line) => (
              <span key={line} className="subtitle-line clip-reveal-line">
                {line}
              </span>
            ))}
          </div>
          <p className="subtitle-line text-[10px] tracking-wideCredit uppercase text-film-muted/70 pt-2">{quote.source}</p>
        </div>
      </div>
    </section>
  );
}
