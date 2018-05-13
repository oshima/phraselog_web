import { fetchPhrases } from '~/api';
import { setRecentPhrases, setPopularPhrases } from '~/actions/home';
import { showMessage } from '~/actions/notificator';

export const requestFetchRecentPhrases = () => async dispatch => {
  const phrases = await fetchPhrases();
  if (phrases) {
    dispatch(setRecentPhrases(phrases));
  } else {
    dispatch(setRecentPhrases([]));
    dispatch(showMessage('Failed to load recent phrases'));
  }
};

export const requestFetchPopularPhrases = () => async dispatch => {
  const phrases = await fetchPhrases({ v: 'popular' });
  if (phrases) {
    dispatch(setPopularPhrases(phrases));
  } else {
    dispatch(setPopularPhrases([]));
    dispatch(showMessage('Failed to load popular phrases'));
  }
};
