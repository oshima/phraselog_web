export const SET_SIGN_IN_USER = 'auth/setSignInUser';

export function setSignInUser(user) {
  return { type: SET_SIGN_IN_USER, payload: { user } };
}
