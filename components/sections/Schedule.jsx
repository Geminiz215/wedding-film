'use client';

// SECTION 5: THE DAY — jadwal acara, billing block, lokasi, dan amplop digital
import { Fragment, useState } from 'react';
import { dates, venue, events, billing, giftAccounts } from '@/data/wedding';

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

function InfoRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between py-2 border-b border-film-gold/10">
      <span className="text-film-muted">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="scene-card bg-film-bgSoft/70 border border-film-gold/30 p-8 md:p-12 rounded-sm relative overflow-hidden preserve-3d">
      <div className="flex justify-between items-center border-b border-film-gold/20 pb-4 mb-6">
        <span className="text-[10px] tracking-wideCredit uppercase text-film-gold">{event.act}</span>
        <span className="font-mono text-xs text-film-muted">{event.reel}</span>
      </div>

      <h3 className="font-serif text-3xl md:text-4xl text-film-cream tracking-wider mb-2">{event.title}</h3>
      <p className="font-serif italic text-film-goldLight text-lg mb-8">{event.subtitle}</p>

      <div className="space-y-4 text-xs tracking-credit uppercase text-film-cream/90">
        <InfoRow label={event.timeLabel} value={event.time} valueClass="text-film-goldLight" />
        <InfoRow label="SET LOCATION" value={event.location} valueClass="text-right" />
        <InfoRow label={event.extraLabel} value={event.extra} />
      </div>

      <p className="mt-6 text-xs text-film-muted/80 leading-relaxed font-light">{event.description}</p>
    </div>
  );
}

function BillingBlock() {
  return (
    <div className="billing-block select-none">
      {billing.map((line, lineIdx) => (
        <Fragment key={lineIdx}>
          {lineIdx > 0 && (
            <>
              <br className="hidden sm:inline" />{' '}
            </>
          )}
          {line.map(([role, name]) => (
            <Fragment key={role + name}>
              <span className="billing-role">{role}</span> <span className="billing-name">{name}</span>{' '}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

function GiftAccount({ account }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyText(account.number.replace(/\s/g, '')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <div className="p-4 border border-film-gold/20 bg-film-bg/60 rounded-sm flex flex-col justify-between">
      <div>
        <p className="text-[9px] tracking-wideCredit uppercase text-film-gold">{account.bank}</p>
        <p className="font-mono text-base text-film-cream mt-1">{account.number}</p>
        <p className="text-[10px] tracking-credit uppercase text-film-muted/75 mt-1">{account.owner}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-4 self-start text-[10px] tracking-credit uppercase text-film-goldLight credit-link"
      >
        {copied ? 'COPIED TO CLIPBOARD ✓' : 'COPY ACCOUNT NO.'}
      </button>
    </div>
  );
}

export default function Schedule({ onOpenMap }) {
  const [addressCopied, setAddressCopied] = useState(false);

  function handleCopyAddress() {
    copyText(venue.copyText).then(() => {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    });
  }

  return (
    <section id="schedule" className="relative py-28 md:py-40 px-6 md:px-16 max-w-6xl mx-auto">
      {/* Decorative Top Rule */}
      <div className="border-t border-b border-film-gold/40 py-4 flex flex-wrap justify-between items-center gap-4 text-[10px] tracking-wideCredit uppercase text-film-gold">
        <span>CALL SHEET // PRODUCTION DAY</span>
        <span>{dates.callSheet}</span>
        <span>LOC: {venue.region}</span>
      </div>

      {/* Main Title */}
      <div className="text-center my-16">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-muted/75 mb-3">OFFICIAL SCREENING &amp; CEREMONY SCHEDULE</p>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-film-gold tracking-poster uppercase font-normal">THE PREMIERE DAY</h2>
      </div>

      {/* Akad & Resepsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 my-16 perspective-stage">
        {events.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>

      {/* Movie Poster Billing Block */}
      <div className="mt-20 pt-12 border-t border-b border-film-gold/30 py-10 text-center max-w-4xl mx-auto">
        <BillingBlock />

        {/* Map & Copy Address Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <button
            type="button"
            onClick={onOpenMap}
            className="credit-link py-2 text-xs tracking-wideCredit uppercase text-film-goldLight hover:text-film-gold"
          >
            VIEW VENUE COORDINATES (MAP) ↗
          </button>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="credit-link py-2 text-xs tracking-wideCredit uppercase text-film-muted hover:text-film-cream"
          >
            COPY LOCATION ADDRESS
          </button>
        </div>
        <p
          className="text-[10px] tracking-credit uppercase text-film-gold mt-3 transition-opacity duration-300"
          style={{ opacity: addressCopied ? 1 : 0 }}
        >
          COORDINATES COPIED TO CLIPBOARD
        </p>
      </div>

      {/* Digital Wedding Gift */}
      <div className="mt-16 max-w-2xl mx-auto text-center bg-film-bgSoft/40 border border-film-gold/20 p-8 rounded-sm">
        <p className="text-[10px] tracking-wideCredit uppercase text-film-gold mb-2">PATRONAGE &amp; TOKENS OF LOVE</p>
        <h3 className="font-serif text-2xl md:text-3xl text-film-cream mb-3">Executive Producer’s Envelope</h3>
        <p className="text-xs text-film-muted/80 font-light leading-relaxed mb-6">
          Kehadiran dan doa restu Anda adalah penghargaan tertinggi bagi pemutaran perdana hidup baru kami. Namun apabila Anda ingin
          mengirimkan tanda kasih secara digital:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {giftAccounts.map((account) => (
            <GiftAccount key={account.number} account={account} />
          ))}
        </div>
      </div>
    </section>
  );
}
