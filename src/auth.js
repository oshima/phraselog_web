import firebase from 'firebase/app';
import 'firebase/auth';
import config from '~/../firebase.config.json';
import { createUser } from '~/api';
import { setSignInUser } from '~/actions/auth';
import { showMessage } from '~/actions/notificator';

let _signInUser;

export function setupAuth(dispatch) {
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(async _user => {
    _signInUser = _user;
    if (_user) {
      const user = {
        id_string: _user.uid,
        display_name: _user.providerData[0].displayName,
        photo_url: _user.providerData[0].photoURL
      };
      if (await createUser(user)) {
        dispatch(setSignInUser(user));
      } else {
        dispatch(setSignInUser(null));
        dispatch(showMessage('Failed to sign in'));
      }
    } else {
      dispatch(setSignInUser(null));
    }
  });
}

export function signInWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

export function signOut() {
  firebase.auth().signOut();
}

export function getIdToken() {
  return _signInUser && _signInUser.getIdToken();
}
