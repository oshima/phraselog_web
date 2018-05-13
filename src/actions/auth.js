export const SET_SIGN_IN_USER = 'SET_SIGN_IN_USER';

export function setSignInUser(user) {
  return { type: SET_SIGN_IN_USER, payload: { user } };
}
