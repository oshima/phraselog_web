import { SHOW_MESSAGE, HIDE_MESSAGE } from '~/actions/notificator';

const initialState = {
  message: null
};

export default function notificatorReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { ...state, message: action.payload.message };
    case HIDE_MESSAGE:
      return initialState;
    default:
      return state;
  }
}
