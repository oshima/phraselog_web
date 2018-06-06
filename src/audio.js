const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
compressor.connect(audioCtx.destination);

const pianoBuffers = new Map();
const memory = new Map();

const fallDelay = 0.25;
const freeDelay = 0.5;

async function fetchAudioData(buffers, key, path) {
  const response = await fetch(path);
  const audioData = await response.arrayBuffer();
  const decodedData = await audioCtx.decodeAudioData(audioData);
  buffers.set(key, decodedData);
}

export function setupAudio() {
  fetchAudioData(pianoBuffers, 0, '/audio/piano/C7.mp3');
  fetchAudioData(pianoBuffers, 1, '/audio/piano/C6.mp3');
  fetchAudioData(pianoBuffers, 2, '/audio/piano/C5.mp3');
  fetchAudioData(pianoBuffers, 3, '/audio/piano/C4.mp3');
  fetchAudioData(pianoBuffers, 4, '/audio/piano/C3.mp3');
}

export function start(note) {
  if (memory.has(note)) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const key = Math.round(note.y / 12);
  const offset = 12 * key - note.y - 1;
  const { currentTime } = audioCtx;
  source.buffer = pianoBuffers.get(key);
  source.detune.setValueAtTime(100 * offset, currentTime);
  source.connect(gain);
  gain.gain.setValueAtTime(0.5, currentTime);
  gain.connect(compressor);
  source.start();
  memory.set(note, { source, gain });
}

export function stop(note) {
  if (!memory.has(note)) return;
  const { source, gain } = memory.get(note);
  const { currentTime } = audioCtx;
  gain.gain.setTargetAtTime(0, currentTime, fallDelay);
  source.stop(currentTime + freeDelay);
  memory.delete(note);
}

export function stopAll() {
  for (const { source, gain } of memory.values()) {
    const { currentTime } = audioCtx;
    gain.gain.setTargetAtTime(0, currentTime, fallDelay);
    source.stop(currentTime + freeDelay);
  }
  memory.clear();
}
