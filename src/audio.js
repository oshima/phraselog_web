import { FREQUENCY_BASE, CHART_HEIGHT } from '~/constants';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
const sources = new Map();

const riseDelay = 0.001;
const fallDelay = 0.01;
const freeDelay = 0.1;

compressor.connect(audioCtx.destination);

export function start(note) {
  if (sources.has(note)) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const { currentTime } = audioCtx;
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(FREQUENCY_BASE, currentTime);
  osc.detune.setValueAtTime(100 * (CHART_HEIGHT - note.y - 1), currentTime);
  osc.connect(gain);
  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.setTargetAtTime(0.1, currentTime, riseDelay);
  gain.connect(compressor);
  osc.start();
  sources.set(note, { osc, gain });
}

export function stop(note) {
  if (!sources.has(note)) return;
  const { osc, gain } = sources.get(note);
  const { currentTime } = audioCtx;
  gain.gain.setTargetAtTime(0, currentTime, fallDelay);
  osc.stop(currentTime + freeDelay);
  sources.delete(note);
}

export function stopAll() {
  for (const { osc, gain } of sources.values()) {
    const { currentTime } = audioCtx;
    gain.gain.setTargetAtTime(0, currentTime, fallDelay);
    osc.stop(currentTime + freeDelay);
  }
  sources.clear();
}
