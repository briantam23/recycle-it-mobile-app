import * as firebase from 'firebase';
require("firebase/firestore");
import { FIREBASE_API_KEY } from './apiKey';

const firebaseConfig = {
apiKey: FIREBASE_API_KEY,
authDomain: "recyle-e9df3.firebaseapp.com",
databaseURL: "https://recyle-e9df3.firebaseio.com",
projectId: "recyle-e9df3",
storageBucket: "recyle-e9df3.appspot.com",
messagingSenderId: "309550820733"
}

const settings ={timestampsInSnapshots:true};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
