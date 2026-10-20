// Tombol musik di pojok kanan bawah.
export default function SoundToggle({ playing, onToggle }) {
  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-10 z-40 flex items-center gap-3">
      <button
        onClick={onToggle}
        aria-label="Toggle Film Score Audio"
        className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-film-bg/85 backdrop-blur-md border border-film-gold/30 hover:border-film-gold/80 transition-all duration-300 shadow-lg"
      >
        {/* Equalizer Bars */}
        <span className="flex items-end gap-[2px] h-3 w-3.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-[2px] h-1 bg-film-gold transition-all duration-300 ${playing ? 'animate-pulse' : ''}`}
              style={playing ? { height: `${6 + ((i * 3) % 8)}px` } : undefined}
            ></span>
          ))}
        </span>
        <span className="text-[9px] tracking-credit uppercase text-film-muted group-hover:text-film-goldLight">
          {playing ? 'SCORE: PLAYING' : 'SCORE: MUTED'}
        </span>
      </button>
    </div>
  );
}
