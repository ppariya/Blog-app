import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

var config = {
  apiKey: "AIzaSyAi_F8psAMEKkSksOac_Mb99zpljDvFBY8",
  authDomain: "blog-5b1ec.firebaseapp.com",
  databaseURL: "https://blog-5b1ec.firebaseio.com",
  projectId: "blog-5b1ec",
  storageBucket: "blog-5b1ec.appspot.com",
  messagingSenderId: "690643341652"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;