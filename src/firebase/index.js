import firebase from 'firebase/app';
import '@firebase/firestore';


const app = firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASECONFIG))

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}