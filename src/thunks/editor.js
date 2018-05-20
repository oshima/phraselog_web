import {
  createPhrase,
  fetchPhrase,
  updatePhrase,
  createUserLikedPhrase,
  fetchUserLikedPhrase,
  deleteUserLikedPhrase
} from '~/api';
import { start, stop, stopAll } from '~/audio';
import {
  CHART_WIDTH_DEFAULT,
  CHART_WIDTH_DELTA,
  CHART_WIDTH_MAX,
  INTERVAL_DEFAULT,
  NOTES_COUNT_MAX
} from '~/constants';
import { getHistory } from '~/history';
import { equals, liesOn, overlapsWith, groupBy, sleep } from '~/utils';
import {
  setPhrase,
  setTitle,
  setInterval,
  setLiked,
  setX,
  setWidth,
  setAnchor,
  setCursor,
  setNote,
  setNotes,
  appendNotes,
  removeNotes,
  resetNotes,
  appendOperation,
  setPointer,
  setDrawing,
  setPlaying,
  setSaving,
  resetEditor
} from '~/actions/editor';
import { showMessage } from '~/actions/notificator';

export const startDrawNote = cursor => async dispatch => {
  dispatch(setDrawing(true));
  const note = { x: cursor.x, y: cursor.y, length: 1 };
  dispatch(setAnchor(cursor.x));
  dispatch(setCursor(cursor));
  dispatch(setNote(note));
  stopAll();
  start(note);
  await sleep(INTERVAL_DEFAULT);
  stop(note);
};

export const continueDrawNote = cursor => async (dispatch, getState) => {
  const { anchor } = getState().editor;
  const note = {
    x: Math.min(anchor, cursor.x),
    y: cursor.y,
    length: Math.abs(anchor - cursor.x) + 1
  };
  dispatch(setCursor(cursor));
  dispatch(setNote(note));
  stopAll();
  start(note);
  await sleep(INTERVAL_DEFAULT);
  stop(note);
};

export const finishDrawNote = () => (dispatch, getState) => {
  const { width, note, notes, pointer } = getState().editor;
  if (
    notes.length < NOTES_COUNT_MAX &&
    notes.every(n => !overlapsWith(n, note))
  ) {
    dispatch(appendNotes([note]));
    dispatch(appendOperation(pointer, { type: 'draw', notes: [note] }));
    dispatch(setPointer(pointer + 1));
  }
  if (
    width < CHART_WIDTH_MAX &&
    note.x + note.length > width - CHART_WIDTH_DELTA
  ) {
    dispatch(setWidth(width + CHART_WIDTH_DELTA));
  }
  dispatch(setDrawing(false));
};

export const eraseNote = note => (dispatch, getState) => {
  const { pointer } = getState().editor;
  dispatch(removeNotes([note]));
  dispatch(appendOperation(pointer, { type: 'erase', notes: [note] }));
  dispatch(setPointer(pointer + 1));
};

export const clearNotes = () => (dispatch, getState) => {
  const { notes, pointer } = getState().editor;
  dispatch(resetNotes());
  dispatch(appendOperation(pointer, { type: 'clear', notes }));
  dispatch(setPointer(pointer + 1));
};

export const startPlayNotes = () => async (dispatch, getState) => {
  dispatch(setPlaying(true));
  const { notes } = getState().editor;
  const notesByStart = groupBy(notes, n => n.x);
  const notesByStop = groupBy(notes, n => n.x + n.length);
  const lastX = Math.max(...Object.keys(notesByStop));
  let { x } = getState().editor;
  let moved = true;
  while (x < lastX && getState().editor.playing) {
    dispatch(setX(x));
    if (moved) {
      stopAll();
      for (const note of notes.filter(n => liesOn(n, x))) start(note);
    } else {
      for (const note of notesByStop[x] || []) stop(note);
      for (const note of notesByStart[x] || []) start(note);
    }
    await sleep(getState().editor.interval);
    const { x: currentX } = getState().editor;
    moved = currentX !== x;
    x = moved ? currentX : x + 1;
  }
  stopAll();
  dispatch(setPlaying(false));
};

export const finishPlayNotes = () => dispatch => {
  dispatch(setPlaying(false));
};

export const undoOperation = () => (dispatch, getState) => {
  const { operations, pointer } = getState().editor;
  if (pointer <= 0) return;
  const prevOperation = operations[pointer - 1];
  switch (prevOperation.type) {
    case 'draw':
      dispatch(removeNotes(prevOperation.notes));
      break;
    case 'erase':
      dispatch(appendNotes(prevOperation.notes));
      break;
    case 'clear':
      dispatch(appendNotes(prevOperation.notes));
      break;
  }
  dispatch(setPointer(pointer - 1));
};

export const redoOperation = () => (dispatch, getState) => {
  const { operations, pointer } = getState().editor;
  if (pointer >= operations.length) return;
  const nextOperation = operations[pointer];
  switch (nextOperation.type) {
    case 'draw':
      dispatch(appendNotes(nextOperation.notes));
      break;
    case 'erase':
      dispatch(removeNotes(nextOperation.notes));
      break;
    case 'clear':
      dispatch(resetNotes());
      break;
  }
  dispatch(setPointer(pointer + 1));
};

export const requestCreatePhrase = () => async (dispatch, getState) => {
  const { signInUser } = getState().auth;
  const { title, interval, notes } = getState().editor;
  let data = { title, interval, notes }; // temporary workaround...
  dispatch(setSaving(true));
  if (await createPhrase(data)) {
    dispatch(resetEditor());
    dispatch(showMessage(`Created "${title}"`));
    getHistory().push(`/users/${signInUser.id_string}`);
  } else {
    dispatch(setSaving(false));
    dispatch(showMessage('Failed to create phrase'));
  }
};

export const requestFetchPhrase = id_string => async dispatch => {
  const phrase = await fetchPhrase(id_string);
  if (phrase) {
    const lastX = Math.max(...phrase.notes.map(n => n.x + n.length));
    const width =
      lastX <= CHART_WIDTH_DEFAULT
        ? CHART_WIDTH_DEFAULT
        : Math.ceil(lastX / CHART_WIDTH_DELTA) * CHART_WIDTH_DELTA;
    dispatch(setPhrase(phrase));
    dispatch(setTitle(phrase.title));
    dispatch(setInterval(phrase.interval));
    dispatch(setNotes(phrase.notes));
    dispatch(setWidth(width));
  } else {
    dispatch(showMessage('Failed to load phrase'));
  }
};

export const requestUpdatePhrase = id_string => async (dispatch, getState) => {
  const { signInUser } = getState().auth;
  const { title, interval, notes } = getState().editor;
  const data = { title, interval, notes };
  dispatch(setSaving(true));
  if (await updatePhrase(id_string, data)) {
    dispatch(resetEditor());
    dispatch(showMessage(`Updated "${title}"`));
    getHistory().push(`/users/${signInUser.id_string}`);
  } else {
    dispatch(showMessage('Failed to update phrase'));
    dispatch(setSaving(false));
  }
};

export const requestCreateUserLikedPhrase = user_id_string => async (
  dispatch,
  getState
) => {
  const { phrase } = getState().editor;
  const { id_string } = phrase;
  const data = { id_string };
  if (await createUserLikedPhrase(user_id_string, data)) {
    dispatch(setLiked(true));
  } else {
    dispatch(showMessage('Failed to like phrase'));
  }
};

export const requestFetchUserLikedPhrase = (
  user_id_string,
  id_string
) => async dispatch => {
  const phrase = await fetchUserLikedPhrase(user_id_string, id_string);
  dispatch(setLiked(Boolean(phrase)));
};

export const requestDeleteUserLikedPhrase = (
  user_id_string,
  id_string
) => async dispatch => {
  if (await deleteUserLikedPhrase(user_id_string, id_string)) {
    dispatch(setLiked(false));
  } else {
    dispatch(showMessage('Failed to unlike phrase'));
  }
};
