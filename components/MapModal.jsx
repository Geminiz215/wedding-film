// Popup info lokasi venue. Data lokasi ada di data/wedding.js → venue
import { venue } from '@/data/wedding';

export default function MapModal({ open, onClose }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-[90] bg-black/80 backdrop-blur-md ${open ? 'flex' : 'hidden'} items-center justify-center p-6`}
    >
      <div className="bg-film-bgSoft border border-film-gold/40 max-w-lg w-full p-8 rounded-sm relative shadow-2xl">
        <div className="flex justify-between items-center border-b border-film-gold/20 pb-4 mb-6">
          <span className="text-[10px] tracking-wideCredit uppercase text-film-gold">SET LOCATION COORDINATES</span>
          <button onClick={onClose} className="text-xs tracking-credit uppercase text-film-muted hover:text-film-gold">
            [CLOSE ×]
          </button>
        </div>

        <h3 className="font-serif text-3xl text-film-cream mb-2">{venue.name}</h3>
        <p className="text-xs tracking-credit uppercase text-film-goldLight mb-4">{venue.address}</p>
        <p className="text-xs text-film-muted/85 leading-relaxed mb-6 font-light">{venue.note}</p>

        <div className="p-4 bg-film-bg border border-film-gold/20 rounded-sm font-mono text-xs text-film-gold mb-6 flex justify-between items-center">
          <span>GPS: {venue.gps}</span>
          <span className="text-[10px] text-film-muted">VALET AVAILABLE</span>
        </div>

        <div className="flex justify-end gap-6">
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-film-gold text-film-bg text-[10px] tracking-wideCredit uppercase font-medium hover:bg-film-goldLight transition-colors rounded-sm"
          >
            OPEN IN GOOGLE MAPS ↗
          </a>
        </div>
      </div>
    </div>
  );
}
