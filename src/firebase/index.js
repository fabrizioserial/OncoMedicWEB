import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDcinCzje9E9uwyxVhe3So1-Aa4jWmrV8s",
    authDomain: "oncologia-austral.firebaseapp.com",
    databaseURL: "https://oncologia-austral-default-rtdb.firebaseio.com",
    projectId: "oncologia-austral",
    storageBucket: "oncologia-austral.appspot.com",
    messagingSenderId: "497357435658",
    appId: "1:497357435658:web:e04ca1161344c718fc40f3"

})

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}