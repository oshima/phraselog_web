import { CHART_WIDTH_DEFAULT, INTERVAL_DEFAULT } from '~/constants';
import {
  SET_PHRASE,
  SET_TITLE,
  SET_INTERVAL,
  SET_LIKED,
  SET_X,
  SET_WIDTH,
  SET_ANCHOR,
  SET_CURSOR,
  SET_NOTE,
  SET_NOTES,
  APPEND_NOTES,
  REMOVE_NOTES,
  RESET_NOTES,
  APPEND_OPERATION,
  SET_POINTER,
  SET_DRAWING,
  SET_HOVERING,
  SET_PLAYING,
  SET_SAVING,
  RESET_EDITOR
} from '~/actions/editor';

const initialState = {
  phrase: null,
  title: '',
  interval: INTERVAL_DEFAULT,
  liked: false,
  x: 0,
  width: CHART_WIDTH_DEFAULT,
  anchor: 0,
  cursor: null,
  note: null,
  notes: [],
  operations: [],
  pointer: 0,
  drawing: false,
  hovering: false,
  playing: false,
  saving: false
};

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PHRASE:
      return { ...state, phrase: action.payload.phrase };
    case SET_TITLE:
      return { ...state, title: action.payload.title };
    case SET_INTERVAL:
      return { ...state, interval: action.payload.interval };
    case SET_LIKED:
      return { ...state, liked: action.payload.liked };
    case SET_X:
      return { ...state, x: action.payload.x };
    case SET_WIDTH:
      return { ...state, width: action.payload.width };
    case SET_ANCHOR:
      return { ...state, anchor: action.payload.anchor };
    case SET_CURSOR:
      return { ...state, cursor: action.payload.cursor };
    case SET_NOTE:
      return { ...state, note: action.payload.note };
    case SET_NOTES:
      return { ...state, notes: action.payload.notes };
    case APPEND_NOTES:
      return { ...state, notes: [...state.notes, ...action.payload.notes] };
    case REMOVE_NOTES:
      return {
        ...state,
        notes: state.notes.filter(n => !action.payload.notes.includes(n))
      };
    case RESET_NOTES:
      return { ...state, notes: initialState.notes };
    case APPEND_OPERATION:
      return {
        ...state,
        operations: [
          ...state.operations.slice(0, action.payload.index),
          action.payload.operation
        ]
      };
    case SET_POINTER:
      return { ...state, pointer: action.payload.pointer };
    case SET_DRAWING:
      return { ...state, drawing: action.payload.drawing };
    case SET_HOVERING:
      return { ...state, hovering: action.payload.hovering };
    case SET_PLAYING:
      return { ...state, playing: action.payload.playing };
    case SET_SAVING:
      return { ...state, saving: action.payload.saving };
    case RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
}
