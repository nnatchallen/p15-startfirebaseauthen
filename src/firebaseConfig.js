import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCduhXZ1w3geOxLaimMG1mQ7XerXZ5TnBo",
    authDomain: "vuejsauthe.firebaseapp.com",
    databaseURL: "https://vuejsauthe.firebaseio.com",
    projectId: "vuejsauthe",
    storageBucket: "vuejsauthe.appspot.com",
    messagingSenderId: "149835378561"
  };
  let firebaseapp = firebase.initializeApp(config);
  let db = firebaseapp.database();

  export { firebaseapp, db };