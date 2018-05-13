import { SET_SIGN_IN_USER } from '~/actions/auth';

const initialState = {
  signInUser: undefined
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIGN_IN_USER:
      return { ...state, signInUser: action.payload.user };
    default:
      return state;
  }
}
