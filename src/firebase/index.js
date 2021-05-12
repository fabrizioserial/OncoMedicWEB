import firebase from 'firebase/app';
import '@firebase/firestore';

const APIKEY = process.env.REACT_APP_FIREBASECONFIG

const app = firebase.initializeApp(APIKEY)

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}