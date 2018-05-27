export const SET_USER = 'profile/setUser';
export const SET_USER_PHRASES = 'profile/setUserPhrases';
export const SET_USER_LIKED_PHRASES = 'profile/setUserLikedPhrases';
export const SET_ACTIVE_TAB = 'profile/setActiveTab';

export const RESET_PROFILE = 'profile/resetProfile';

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
