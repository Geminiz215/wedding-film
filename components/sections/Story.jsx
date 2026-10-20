// SECTION 3: THE STORY — "SCENES" (kartu 3D). Isi cerita ada di data/wedding.js → scenes
import FilmImage from '@/components/FilmImage';
import { scenes } from '@/data/wedding';

// Kelas tata letak untuk setiap pilihan `layout` di data
const LAYOUTS = {
  left: {
    photo: 'lg:col-span-7',
    text: 'lg:col-span-5 lg:pl-6',
    aspect: 'aspect-[16/10]',
    timecode: 'left-4',
  },
  right: {
    photo: 'lg:col-span-7 order-1 lg:order-2',
    text: 'lg:col-span-5 order-2 lg:order-1 lg:pr-6 text-left lg:text-right',
    aspect: 'aspect-[16/10]',
    timecode: 'right-4',
  },
  offset: {
    photo: 'lg:col-span-6 lg:col-start-2',
    text: 'lg:col-span-5',
    aspect: 'aspect-[4/3]',
    timecode: 'left-4',
  },
};

function SceneCard({ scene }) {
  const layout = LAYOUTS[scene.layout];
  const isRight = scene.layout === 'right';
  const labels = isRight ? [scene.date, scene.number] : [scene.number, scene.date];

  return (
    <article className="scene-card grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center preserve-3d">
      <div className={`${layout.photo} film-photo-wrap relative overflow-hidden rounded-sm border border-film-gold/25 bg-film-bgSoft p-2 md:p-3`}>
        <div className={`relative ${layout.aspect} overflow-hidden rounded-sm`}>
          <FilmImage {...scene.image} className="w-full h-full object-cover film-photo scene-parallax-img" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/80 via-transparent to-transparent"></div>
          <span className={`absolute bottom-3 ${layout.timecode} font-mono text-[10px] tracking-widest text-film-gold/90`}>
            {scene.timecode}
          </span>
        </div>
      </div>

      <div className={`${layout.text} space-y-4`}>
        <div
          className={`inline-flex items-center ${isRight ? 'lg:justify-end' : ''} gap-3 text-[10px] tracking-wideCredit uppercase text-film-gold`}
        >
          <span>{labels[0]}</span>
          <span className="w-8 h-[1px] bg-film-gold/50"></span>
          <span>{labels[1]}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-film-goldLight tracking-wide">{scene.title}</h3>
        <p className="text-sm md:text-base text-film-cream/85 font-light leading-relaxed">{scene.story}</p>
        <p className="font-serif italic text-film-muted text-sm pt-2">{scene.quote}</p>
      </div>
    </article>
  );
}

export default function Story() {
  return (
    <section id="story" className="relative py-24 md:py-36 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-film-gold/25">
        <div>
          <p className="text-[10px] tracking-wideCredit uppercase text-film-gold mb-2">CHRONOLOGY OF FRAMES</p>
          <h2 className="font-serif text-4xl md:text-6xl text-film-cream tracking-poster uppercase font-normal">THE STORY IN SCENES</h2>
        </div>
        <p className="text-[10px] tracking-credit uppercase text-film-muted/70 mt-4 md:mt-0">FOUR ACTS • SHOT ON LOCATION (2021 — 2026)</p>
      </div>

      <div className="space-y-28 md:space-y-40 perspective-stage">
        {scenes.map((scene) => (
          <SceneCard key={scene.number} scene={scene} />
        ))}
      </div>
    </section>
  );
}
