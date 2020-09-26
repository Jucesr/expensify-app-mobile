// This import loads the firebase namespace along with all its type information.
import * as firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";
import Constants from "expo-constants";

const {
   apiKey,
   authDomain,
   databaseURL,
   projectId,
   storageBucket,
   messagingSenderId,
   appId,
} = Constants.manifest.extra;

const config = {
   apiKey,
   authDomain,
   databaseURL,
   projectId,
   storageBucket,
   messagingSenderId,
   appId,
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
