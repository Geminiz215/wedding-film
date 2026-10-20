// <img> biasa + gambar cadangan (fallback) jika link foto gagal dimuat.
export default function FilmImage({ src, fallback, alt, className, lazy = true }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      className={className}
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
    />
  );
}
