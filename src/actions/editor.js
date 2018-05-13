export const SET_PHRASE = 'SET_PHRASE';
export const SET_TITLE = 'SET_TITLE';
export const SET_INTERVAL = 'SET_INTERVAL';
export const SET_LIKED = 'SET_LIKED';

export const SET_X = 'SET_X';
export const SET_WIDTH = 'SET_WIDTH';
export const SET_ANCHOR = 'SET_ANCHOR';
export const SET_CURSOR = 'SET_CURSOR';
export const SET_NOTE = 'SET_NOTE';
export const SET_NOTES = 'SET_NOTES';

export const APPEND_NOTES = 'APPEND_NOTES';
export const REMOVE_NOTES = 'REMOVE_NOTES';
export const RESET_NOTES = 'RESET_NOTES';

export const APPEND_OPERATION = 'APPEND_OPERATION';
export const SET_POINTER = 'SET_POINTER';

export const SET_DRAWING = 'SET_DRAWING';
export const SET_PLAYING = 'SET_PLAYING';
export const SET_SAVING = 'SET_SAVING';

export const RESET_EDITOR = 'RESET_EDITOR';

export function setPhrase(phrase) {
  return { type: SET_PHRASE, payload: { phrase } };
}

export function setTitle(title) {
  return { type: SET_TITLE, payload: { title } };
}

export function setInterval(interval) {
  return { type: SET_INTERVAL, payload: { interval } };
}

export function setLiked(liked) {
  return { type: SET_LIKED, payload: { liked } };
}

export function setX(x) {
  return { type: SET_X, payload: { x } };
}

export function setWidth(width) {
  return { type: SET_WIDTH, payload: { width } };
}

export function setAnchor(anchor) {
  return { type: SET_ANCHOR, payload: { anchor } };
}

export function setCursor(cursor) {
  return { type: SET_CURSOR, payload: { cursor } };
}

export function setNote(note) {
  return { type: SET_NOTE, payload: { note } };
}

export function setNotes(notes) {
  return { type: SET_NOTES, payload: { notes } };
}

export function appendNotes(notes) {
  return { type: APPEND_NOTES, payload: { notes } };
}

export function removeNotes(notes) {
  return { type: REMOVE_NOTES, payload: { notes } };
}

export function resetNotes() {
  return { type: RESET_NOTES };
}

export function appendOperation(index, operation) {
  return { type: APPEND_OPERATION, payload: { index, operation } };
}

export function setPointer(pointer) {
  return { type: SET_POINTER, payload: { pointer } };
}

export function setDrawing(drawing) {
  return { type: SET_DRAWING, payload: { drawing } };
}

export function setPlaying(playing) {
  return { type: SET_PLAYING, payload: { playing } };
}

export function setSaving(saving) {
  return { type: SET_SAVING, payload: { saving } };
}

export function resetEditor() {
  return { type: RESET_EDITOR };
}
