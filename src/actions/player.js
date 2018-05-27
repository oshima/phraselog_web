export const SET_PHRASE = 'player/setPhrase';
export const SET_LIKED = 'player/setLiked';
export const SET_X = 'player/setX';
export const SET_MIN_X = 'player/setMinX';
export const SET_MAX_X = 'player/setMaxX';
export const SET_MIN_Y = 'player/setMinY';
export const SET_MAX_Y = 'player/setMaxY';
export const SET_PLAYING = 'player/setPlaying';

export const RESET_PLAYER = 'player/resetPlayer';

export function setPhrase(phrase) {
  return { type: SET_PHRASE, payload: { phrase } };
}

export function setLiked(liked) {
  return { type: SET_LIKED, payload: { liked } };
}

export function setX(x) {
  return { type: SET_X, payload: { x } };
}

export function setMinX(x) {
  return { type: SET_MIN_X, payload: { x } };
}

export function setMaxX(x) {
  return { type: SET_MAX_X, payload: { x } };
}

export function setMinY(y) {
  return { type: SET_MIN_Y, payload: { y } };
}

export function setMaxY(y) {
  return { type: SET_MAX_Y, payload: { y } };
}

export function setPlaying(playing) {
  return { type: SET_PLAYING, payload: { playing } };
}

export function resetPlayer() {
  return { type: RESET_PLAYER };
}
