import {
  fetchUser,
  deletePhrase,
  fetchUserPhrases,
  fetchUserLikedPhrases
} from '~/api';
import {
  setUser,
  setUserPhrases,
  setUserLikedPhrases
} from '~/actions/profile';
import { resetEditor } from '~/actions/editor';
import { showMessage } from '~/actions/notificator';

export const requestFetchUser = id_string => async dispatch => {
  const user = await fetchUser(id_string);
  if (user) {
    dispatch(setUser(user));
  } else {
    dispatch(setUser(null));
    dispatch(showMessage('Failed to load user'));
  }
};

export const requestDeletePhrase = id_string => async (dispatch, getState) => {
  if (await deletePhrase(id_string)) {
    const { userPhrases } = getState().profile;
    const phrase = userPhrases.find(p => p.id_string === id_string);
    const otherPhrases = userPhrases.filter(p => p.id_string !== id_string);
    dispatch(setUserPhrases(otherPhrases));
    dispatch(showMessage(`Deleted "${phrase.title}"`));
    const { phrase: phraseInEditor } = getState().editor;
    if (phraseInEditor && phraseInEditor.id_string === id_string)
      dispatch(resetEditor());
  } else {
    dispatch(showMessage('Failed to delete phrase'));
  }
};

export const requestFetchUserPhrases = (
  user_id_string,
  params
) => async dispatch => {
  const phrases = await fetchUserPhrases(user_id_string, params);
  if (phrases) {
    dispatch(setUserPhrases(phrases));
  } else {
    dispatch(setUserPhrases([]));
    dispatch(showMessage('Failed to load phrases of user'));
  }
};

export const requestFetchUserLikedPhrases = (
  user_id_string,
  params
) => async dispatch => {
  const phrases = await fetchUserLikedPhrases(user_id_string, params);
  if (phrases) {
    dispatch(setUserLikedPhrases(phrases));
  } else {
    dispatch(setUserLikedPhrases([]));
    dispatch(showMessage('Failed to load phrases liked by user'));
  }
};
