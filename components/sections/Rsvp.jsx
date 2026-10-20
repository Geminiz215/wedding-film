'use client';

// SECTION 6: RSVP & UCAPAN. Ucapan contoh ada di data/wedding.js → initialWishes
// Catatan: ucapan baru hanya tersimpan di browser tamu (belum dikirim ke server/database).
import { useEffect, useState } from 'react';
import { dates, initialWishes } from '@/data/wedding';
import { getGuestName } from '@/lib/guest';

function Wish({ wish }) {
  // Ucapan baru muncul dengan efek fade-in & warna sedikit lebih terang
  const [shown, setShown] = useState(!wish.isNew);
  useEffect(() => {
    if (!shown) requestAnimationFrame(() => setShown(true));
  }, [shown]);

  const hiddenClass = shown ? '' : 'opacity-0 -translate-y-2';

  return wish.isNew ? (
    <div className={`border-b border-film-gold/25 pb-5 space-y-2 transition-all duration-700 ${hiddenClass}`}>
      <div className="flex justify-between items-center">
        <h4 className="text-xs tracking-credit uppercase text-film-gold font-medium">{wish.name}</h4>
        <span className="text-[9px] tracking-credit uppercase text-film-muted/75">{wish.note}</span>
      </div>
      <p className="font-serif italic text-lg text-film-cream leading-relaxed">“{wish.message}”</p>
    </div>
  ) : (
    <div className="border-b border-film-gold/15 pb-5 space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-xs tracking-credit uppercase text-film-goldLight font-medium">{wish.name}</h4>
        <span className="text-[9px] tracking-credit uppercase text-film-muted/60">{wish.note}</span>
      </div>
      <p className="font-serif italic text-lg text-film-cream/90 leading-relaxed">“{wish.message}”</p>
    </div>
  );
}

const labelClass = 'block text-[10px] tracking-wideCredit uppercase text-film-muted mb-2';

export default function Rsvp() {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ATTENDING PREMIERE');
  const [seats, setSeats] = useState('2 SEATS');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const guest = getGuestName();
    if (guest) setName(guest);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const note = status === 'ATTENDING PREMIERE' ? `${status} • ${seats}` : status;
    setWishes((prev) => [{ name: name.trim(), note, message: message.trim(), isNew: true }, ...prev]);
    setMessage('');

    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <section id="rsvp" className="relative py-28 md:py-40 px-6 md:px-16 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-gold mb-3">BOX OFFICE RESERVATION &amp; CRITICS’ NOTES</p>
        <h2 className="font-serif text-4xl md:text-6xl text-film-cream tracking-poster uppercase font-normal">RESERVE YOUR SEAT</h2>
        <p className="text-xs tracking-credit uppercase text-film-muted/70 mt-3">KINDLY CONFIRM ATTENDANCE BEFORE {dates.rsvpDeadline}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-8 bg-film-bgSoft/50 border border-film-gold/25 p-8 md:p-10 rounded-sm">
          <div className="border-b border-film-gold/20 pb-3 flex justify-between items-center">
            <span className="text-[10px] tracking-wideCredit uppercase text-film-gold">ADMIT ONE / TWO</span>
            <span className="font-mono text-[10px] text-film-muted">TICKET NO. #2410</span>
          </div>

          {/* Guest Name */}
          <div className="film-input-group">
            <label htmlFor="rsvp-name" className={labelClass}>
              GUEST NAME (CREDITED AS) *
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nadya & Raka"
              className="film-input w-full bg-transparent border-b border-film-gold/30 py-3 text-sm text-film-cream placeholder-film-muted/35 focus:outline-none"
            />
            <span className="film-input-line"></span>
          </div>

          {/* Attendance & Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="film-input-group">
              <label htmlFor="rsvp-status" className={labelClass}>
                ATTENDANCE *
              </label>
              <select
                id="rsvp-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="film-input w-full bg-film-bg border-b border-film-gold/30 py-3 text-xs tracking-credit uppercase text-film-cream focus:outline-none"
              >
                <option value="ATTENDING PREMIERE">ATTENDING PREMIERE</option>
                <option value="SENDING WARM REGARDS">AFAR (WARM REGARDS)</option>
              </select>
              <span className="film-input-line"></span>
            </div>

            <div className="film-input-group">
              <label htmlFor="rsvp-seats" className={labelClass}>
                SEATS RESERVED
              </label>
              <select
                id="rsvp-seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="film-input w-full bg-film-bg border-b border-film-gold/30 py-3 text-xs tracking-credit uppercase text-film-cream focus:outline-none"
              >
                <option value="1 SEAT">01 SEAT</option>
                <option value="2 SEATS">02 SEATS</option>
              </select>
              <span className="film-input-line"></span>
            </div>
          </div>

          {/* Wishes */}
          <div className="film-input-group">
            <label htmlFor="rsvp-message" className={labelClass}>
              AUDIENCE NOTE / WISHES FOR THE COUPLE *
            </label>
            <textarea
              id="rsvp-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a warm note for the closing credits..."
              className="film-input w-full bg-transparent border-b border-film-gold/30 py-3 text-sm text-film-cream placeholder-film-muted/35 focus:outline-none resize-none"
            ></textarea>
            <span className="film-input-line"></span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button type="submit" className="credit-link py-2.5 text-xs tracking-wideCredit uppercase text-film-gold hover:text-film-goldLight font-medium">
              SUBMIT TO END CREDITS ⟶
            </button>
            <span
              className="text-[10px] tracking-credit uppercase text-film-goldLight transition-opacity duration-500"
              style={{ opacity: toast ? 1 : 0 }}
            >
              RECORDED IN REEL
            </span>
          </div>
        </form>

        {/* Wishes Feed */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-film-gold/25 pb-4">
            <span className="text-[10px] tracking-wideCredit uppercase text-film-gold">AUDIENCE ACCLAIM &amp; WISHES ROLL</span>
            <span className="font-mono text-xs text-film-muted">{String(wishes.length).padStart(2, '0')} NOTES</span>
          </div>

          <div className="space-y-6 max-h-[460px] overflow-y-auto pr-2">
            {wishes.map((wish, i) => (
              <Wish key={wishes.length - i} wish={wish} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
