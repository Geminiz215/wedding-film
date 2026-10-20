// Musik latar dibuat langsung dengan Web Audio API (tanpa file mp3):
// pad akor hangat + suara "kresek" piringan hitam, plus bunyi beep film leader.

let audioCtx = null;
let masterGain = null;
let chordInterval = null;
let isPlaying = false;

// Romantic Cinema Chords (Fmaj7 - Em7 - Dm7 - Cmaj7)
const CHORDS = [
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [164.81, 196.0, 246.94, 293.66], // Em7
  [146.83, 174.61, 220.0, 261.63], // Dm7
  [130.81, 164.81, 196.0, 246.94], // Cmaj7
];

function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

// Classic 35mm Leader Beep (hanya bunyi setelah audio diaktifkan oleh klik user)
export function playLeaderBeep(freq = 880, duration = 0.08) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore if blocked before user gesture
  }
}

function startVinylCrackle() {
  const bufferSize = audioCtx.sampleRate * 3;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() < 0.0025 ? (Math.random() * 2 - 1) * 0.35 : (Math.random() * 2 - 1) * 0.015;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 1400;

  const crackleGain = audioCtx.createGain();
  crackleGain.gain.value = 0.18;

  noise.connect(bandpass);
  bandpass.connect(crackleGain);
  crackleGain.connect(masterGain);
  noise.start();
}

let chordIdx = 0;
function playWarmChord() {
  if (!isPlaying) return;
  const notes = CHORDS[chordIdx % CHORDS.length];
  chordIdx++;
  const now = audioCtx.currentTime;

  notes.forEach((freq) => {
    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.06, now + 1.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 6.0);
  });
}

export function startFilmScore() {
  initAudioContext();
  if (isPlaying) return;

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.14, audioCtx.currentTime + 2.5);
  masterGain.connect(audioCtx.destination);

  startVinylCrackle();

  isPlaying = true;
  chordIdx = 0;
  playWarmChord();
  chordInterval = setInterval(playWarmChord, 5500);
}

export function stopFilmScore() {
  if (!isPlaying || !masterGain) return;
  isPlaying = false;
  if (chordInterval) clearInterval(chordInterval);
  try {
    masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
  } catch (e) {}
}
