import {
  fetchPhrase,
  createUserLikedPhrase,
  fetchUserLikedPhrase,
  deleteUserLikedPhrase
} from '~/api';
import { start, stop, stopAll } from '~/audio';
import { liesOn, groupBy, sleep } from '~/utils';
import {
  setPhrase,
  setLiked,
  setX,
  setMinX,
  setMaxX,
  setMinY,
  setMaxY,
  setPlaying,
  resetPlayer
} from '~/actions/player';
import { showMessage } from '~/actions/notificator';

export const startPlayNotes = () => async (dispatch, getState) => {
  dispatch(setPlaying(true));
  const { phrase, minX, maxX } = getState().player;
  const notesByStart = groupBy(phrase.notes, n => n.x);
  const notesByStop = groupBy(phrase.notes, n => n.x + n.length);
  let x = minX;
  while (x <= maxX && getState().player.playing) {
    dispatch(setX(x));
    for (const note of notesByStop[x] || []) stop(note);
    for (const note of notesByStart[x] || []) start(note);
    await sleep(phrase.interval);
    x += 1;
  }
  stopAll();
  dispatch(setPlaying(false));
};

export const finishPlayNotes = () => dispatch => {
  dispatch(setPlaying(false));
};

export const requestFetchPhrase = id_string => async dispatch => {
  const phrase = await fetchPhrase(id_string);
  if (phrase) {
    const minX = Math.min(...phrase.notes.map(n => n.x));
    const maxX = Math.max(...phrase.notes.map(n => n.x + n.length)) - 1;
    const yArray = phrase.notes.map(n => n.y);
    const minY = Math.min(...yArray);
    const maxY = Math.max(...yArray);
    dispatch(setPhrase(phrase));
    dispatch(setMinX(minX));
    dispatch(setMaxX(maxX));
    dispatch(setMinY(minY));
    dispatch(setMaxY(maxY));
  } else {
    dispatch(showMessage('Failed to load phrase'));
  }
};

export const requestCreateUserLikedPhrase = user_id_string => async (
  dispatch,
  getState
) => {
  const { phrase } = getState().player;
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
