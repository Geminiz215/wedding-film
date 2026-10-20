// SECTION 4: GALLERY — "STILLS". Daftar foto ada di data/wedding.js → stills
import FilmImage from '@/components/FilmImage';
import { stills } from '@/data/wedding';

function Still({ still }) {
  return (
    <figure className={`dof-still ${still.className} film-photo-wrap bg-film-bgSoft/80 border border-film-gold/25 p-3 rounded-sm preserve-3d`}>
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-film-gold/75 mb-2 px-1">
        <span>{still.stock}</span>
        <span>{still.frame}</span>
      </div>
      <div className={`relative ${still.aspect} overflow-hidden rounded-sm`}>
        <FilmImage {...still.image} className="w-full h-full object-cover film-photo" />
        {still.subtitle ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-film-bg/85 via-transparent to-film-bg/30"></div>
            {/* Subtitle burned into frame */}
            <div className="absolute bottom-4 md:bottom-7 inset-x-4 text-center">
              <span className="px-3 py-1 bg-black/55 font-serif italic text-sm md:text-xl text-film-goldLight tracking-wide">
                {still.subtitle}
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-film-bg/70 via-transparent to-transparent"></div>
        )}
      </div>
      <figcaption className="mt-3 flex justify-between items-center text-[10px] tracking-credit uppercase text-film-muted/80 px-1">
        <span>{still.caption}</span>
        <span className="font-serif italic capitalize text-film-goldLight">{still.exposure}</span>
      </figcaption>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-28 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-gold mb-3">35MM CONTACT SHEET // SELECTED FRAMES</p>
        <h2 className="font-serif text-4xl md:text-6xl text-film-cream tracking-poster uppercase font-normal">MOTION PICTURE STILLS</h2>
        <p className="text-xs tracking-credit uppercase text-film-muted/70 mt-4">SCROLL TO PULL FOCUS ACROSS MEMORY FRAMES</p>
      </div>

      {/* Asymmetrical Editorial Grid (12 kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start perspective-stage">
        {stills.map((still) => (
          <Still key={still.frame} still={still} />
        ))}
      </div>
    </section>
  );
}
