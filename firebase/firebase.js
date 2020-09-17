// This import loads the firebase namespace along with all its type information.
import * as firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";
// import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyCtE3fsdro_QFtPP539-N4MpBe8N21of4s",
   authDomain: "expensify-e2139.firebaseapp.com",
   databaseURL: "https://expensify-e2139.firebaseio.com",
   projectId: "expensify-e2139",
   storageBucket: "expensify-e2139.appspot.com",
   messagingSenderId: "651061411468",
   appId: "1:651061411468:web:987d179043d1baf6ecc5a9",
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
