import firebase from 'firebase/app';
import 'firebase/auth';
import config from '~/../firebase.config.json';
import { createUser } from '~/api';
import { setSignInUser } from '~/actions/auth';
import { showMessage } from '~/actions/notificator';

let firebaseUser;

export function setupAuth(dispatch) {
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(async newFirebaseUser => {
    firebaseUser = newFirebaseUser;
    if (firebaseUser) {
      const user = convertFirebaseUser(firebaseUser);
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

// convert a firebase user object to this app's one
function convertFirebaseUser(firebaseUser) {
  return {
    id_string: firebaseUser.uid,
    display_name: firebaseUser.providerData[0].displayName,
    photo_url: firebaseUser.providerData[0].photoURL
  };
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
  return firebaseUser && firebaseUser.getIdToken();
}
