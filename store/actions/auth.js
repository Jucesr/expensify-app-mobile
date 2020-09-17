import database, {
   firebase,
   googleAuthProvider,
} from "../../firebase/firebase";

export const login = (user) => {
   return (dispatch) => {
      const { uid, displayName, email, photoURL } = user;
      return database
         .ref(`users/${uid}/user_info/`)
         .set({
            displayName,
            email,
         })
         .then(() => {
            dispatch({
               type: "LOGIN",
               uid,
               displayName,
               photoURL,
            });
         })
         .catch((e) => {
            console.log(e);
         });
   };
};

export const startLogin = ({ idToken, accessToken }) => {
   return () => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
         idToken,
         accessToken
      );
      return firebase.auth().signInWithCredential(credential);
   };
};

export const logout = () => ({
   type: "LOGOUT",
});

export const startLogout = () => {
   return () => {
      return firebase.auth().signOut();
   };
};
