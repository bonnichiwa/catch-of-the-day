import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzZ4crVsJmET8lgigRgDmbANPIuLul6b4",
    authDomain: "catch-of-the-day-bonnichiwa.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-bonnichiwa.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
