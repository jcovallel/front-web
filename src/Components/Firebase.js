import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCvDaw6QYUn6k4gbIADnF5GxYPEgkVNM9s",
    authDomain: "pugchat-sa.firebaseapp.com",
    databaseURL: "https://pugchat-sa.firebaseio.com",
    projectId: "pugchat-sa",
    storageBucket: "pugchat-sa.appspot.com",
    messagingSenderId: "693656691219",
    appId: "1:693656691219:web:a8bccbc821022b400855e6",
    measurementId: "G-YH5WV1VKDQ"
}

firebase.initializeApp(config)
firebase.firestore().settings({
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()