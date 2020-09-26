import database, {
   firebase,
   googleAuthProvider,
} from "../../firebase/firebase";

export const login = (user) => {
   return async (dispatch) => {
      const { uid, displayName, email, photoURL } = user;
      const res = await database.ref(`users/${uid}/user_info/`).set({
         displayName,
         email,
      });
      return dispatch({
         type: "LOGIN",
         uid,
         displayName,
         photoURL,
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
   return async (dispatch) => {
      await firebase.auth().signOut();
      return dispatch(logout());
   };
};
