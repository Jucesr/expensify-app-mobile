import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { firebase } from "./firebase/firebase";

import "moment/locale/es";
//  Reducers
import expensesReducer from "./store/reducers/expenses";
import authReducer from "./store/reducers/auth";
import filtersReducer from "./store/reducers/filters";
import langReducer from "./store/reducers/lang";

import { login, logout } from "./store/actions/auth";
import { setExpenses } from "./store/actions/expenses";

import LoginScreen from "./screens/LoginScreen";

const rootReducer = combineReducers({
   expenses: expensesReducer,
   auth: authReducer,
   filters: filtersReducer,
   lang: langReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
   return Font.loadAsync({
      "montserrat-blackitalic": require("./assets/fonts/Montserrat-BlackItalic.ttf"),
      "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
      "roboto-blackitalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      roboto: require("./assets/fonts/Roboto-Regular.ttf"),
   });
};

export default function App() {
   const [dataLoaded, setDataLoaded] = useState(false);
   const [isSignIn, setIsSignIn] = useState(false);
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         store
            .dispatch(login(user))
            .then(() => {
               return store.dispatch(setExpenses());
            })
            .then(() => {
               setIsSignIn(true);
            });
      } else {
         //   renderApp();
         store.dispatch(logout());
         setIsSignIn(false);
      }
   });

   if (!dataLoaded) {
      return (
         <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
         />
      );
   }

   if (!isSignIn) {
      return (
         <Provider store={store}>
            <LoginScreen />
         </Provider>
      );
   }

   return (
      <Provider store={store}>
         <MainNavigator />
      </Provider>
   );
}
