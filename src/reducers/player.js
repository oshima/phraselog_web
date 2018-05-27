import {
  SET_PHRASE,
  SET_LIKED,
  SET_X,
  SET_MIN_X,
  SET_MAX_X,
  SET_MIN_Y,
  SET_MAX_Y,
  SET_PLAYING,
  RESET_PLAYER
} from '~/actions/player';

const initialState = {
  phrase: null,
  liked: false,
  x: 0,
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  playing: false
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PHRASE:
      return { ...state, phrase: action.payload.phrase };
    case SET_LIKED:
      return { ...state, liked: action.payload.liked };
    case SET_X:
      return { ...state, x: action.payload.x };
    case SET_MIN_X:
      return { ...state, minX: action.payload.x };
    case SET_MAX_X:
      return { ...state, maxX: action.payload.x };
    case SET_MIN_Y:
      return { ...state, minY: action.payload.y };
    case SET_MAX_Y:
      return { ...state, maxY: action.payload.y };
    case SET_PLAYING:
      return { ...state, playing: action.payload.playing };
    case RESET_PLAYER:
      return initialState;
    default:
      return state;
  }
}
