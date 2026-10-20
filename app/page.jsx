'use client';

// Halaman utama: menyusun semua section sesuai urutan "film".
import { useEffect, useState } from 'react';
import { startFilmScore, stopFilmScore, playLeaderBeep } from '@/lib/filmScore';
import { initCinematicScroll } from '@/lib/cinematicScroll';

import FilmLeader from '@/components/FilmLeader';
import CinemaOverlays from '@/components/CinemaOverlays';
import Header from '@/components/Header';
import SoundToggle from '@/components/SoundToggle';
import MapModal from '@/components/MapModal';
import Hero from '@/components/sections/Hero';
import Credits from '@/components/sections/Credits';
import Story from '@/components/sections/Story';
import Gallery from '@/components/sections/Gallery';
import Schedule from '@/components/sections/Schedule';
import Rsvp from '@/components/sections/Rsvp';
import Closing from '@/components/sections/Closing';

export default function Home() {
  const [scorePlaying, setScorePlaying] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => initCinematicScroll(), []);

  function setScore(on) {
    if (on) startFilmScore();
    else stopFilmScore();
    setScorePlaying(on);
  }

  function handleEnter(withAudio) {
    if (!withAudio) return;
    setScore(true);
    playLeaderBeep(1320, 0.12);
  }

  return (
    <>
      <FilmLeader onEnter={handleEnter} />
      <CinemaOverlays />
      <Header />
      <SoundToggle playing={scorePlaying} onToggle={() => setScore(!scorePlaying)} />

      <main id="smooth-wrapper" className="relative z-10">
        <Hero />
        <Credits />
        <Story />
        <Gallery />
        <Schedule onOpenMap={() => setMapOpen(true)} />
        <Rsvp />
        <Closing />
      </main>

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
