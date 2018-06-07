const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
compressor.connect(audioCtx.destination);

const pianoBuffers = new Map();
const memory = new Map();

const semitoneRatio = Math.pow(2, 1 / 12);
const fallDelay = 0.25;
const freeDelay = 0.5;

function fetchAudioData(buffers, key, path) {
  const request = new XMLHttpRequest();
  request.open('GET', path, true);
  request.responseType = 'arraybuffer';
  request.onload = () => {
    const audioData = request.response;
    audioCtx.decodeAudioData(audioData, decodedData => {
      buffers.set(key, decodedData);
    });
  };
  request.send();
}

export function setupAudio() {
  fetchAudioData(pianoBuffers, 0, '/audio/piano/C7v16.mp3');
  fetchAudioData(pianoBuffers, 1, '/audio/piano/C6v12.mp3');
  fetchAudioData(pianoBuffers, 2, '/audio/piano/C5v12.mp3');
  fetchAudioData(pianoBuffers, 3, '/audio/piano/C4v8.mp3');
  fetchAudioData(pianoBuffers, 4, '/audio/piano/C3v8.mp3');
}

export function start(note) {
  if (memory.has(note)) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const key = Math.round(note.y / 12);
  const offset = 12 * key - note.y - 1;
  source.buffer = pianoBuffers.get(key);
  source.playbackRate.value = Math.pow(semitoneRatio, offset);
  source.connect(gain);
  gain.gain.value = 0.5;
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
