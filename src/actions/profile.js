export const SET_USER = 'SET_USER';
export const SET_USER_PHRASES = 'SET_USER_PHRASES';
export const SET_USER_LIKED_PHRASES = 'SET_USER_LIKED_PHRASES';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const RESET_PROFILE = 'RESET_PROFILE';

export function setUser(user) {
  return { type: SET_USER, payload: { user } };
}

export function setUserPhrases(phrases) {
  return { type: SET_USER_PHRASES, payload: { phrases } };
}

export function setUserLikedPhrases(phrases) {
  return { type: SET_USER_LIKED_PHRASES, payload: { phrases } };
}

export function setActiveTab(number) {
  return { type: SET_ACTIVE_TAB, payload: { number } };
}

export function resetProfile() {
  return { type: RESET_PROFILE };
}
