export const SET_PHRASE = 'editor/setPhrase';
export const SET_TITLE = 'editor/setTitle';
export const SET_INTERVAL = 'editor/setInterval';
export const SET_LIKED = 'editor/setLiked';

export const SET_X = 'editor/setX';
export const SET_WIDTH = 'editor/setWidth';
export const SET_ANCHOR = 'editor/setAnchor';
export const SET_CURSOR = 'editor/setCursor';
export const SET_NOTE = 'editor/setNote';
export const SET_NOTES = 'editor/setNotes';

export const APPEND_NOTES = 'editor/appendNotes';
export const REMOVE_NOTES = 'editor/removeNotes';
export const RESET_NOTES = 'editor/resetNotes';

export const APPEND_OPERATION = 'editor/appendOperation';
export const SET_POINTER = 'editor/setPointer';

export const SET_DRAWING = 'editor/setDrawing';
export const SET_PLAYING = 'editor/setPlaying';
export const SET_SAVING = 'editor/setSaving';

export const RESET_EDITOR = 'editor/resetEditor';

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
