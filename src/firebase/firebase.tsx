import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBMPXUl2PERXrbAUtPujHj04Yllk46xfRg",
    authDomain: "csis-4495.firebaseapp.com",
    databaseURL: "https://csis-4495.firebaseio.com",
    projectId: "csis-4495",
    storageBucket: "csis-4495.appspot.com",
    messagingSenderId: "652993270371",
    appId: "1:652993270371:web:979f7522b83bc351"
};
firebase.initializeApp(config);

export default firebase;