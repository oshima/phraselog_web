export const SET_RECENT_PHRASES = 'home/setRecentPhrases';
export const SET_POPULAR_PHRASES = 'home/setPopularPhrases';

export function setRecentPhrases(phrases) {
  return { type: SET_RECENT_PHRASES, payload: { phrases } };
}

export function setPopularPhrases(phrases) {
  return { type: SET_POPULAR_PHRASES, payload: { phrases } };
}
