export const SET_RECENT_PHRASES = 'SET_RECENT_PHRASES';
export const SET_POPULAR_PHRASES = 'SET_POPULAR_PHRASES';

export function setRecentPhrases(phrases) {
  return { type: SET_RECENT_PHRASES, payload: { phrases } };
}

export function setPopularPhrases(phrases) {
  return { type: SET_POPULAR_PHRASES, payload: { phrases } };
}
