import React, { useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import * as Localization from "expo-localization";

import "moment/locale/es";
//  Reducers
import expensesReducer from "./store/reducers/expenses";
import authReducer from "./store/reducers/auth";
import filtersReducer from "./store/reducers/filters";
import langReducer from "./store/reducers/lang";

// Actions
import { setLanguage } from "./store/actions/lang";

const rootReducer = combineReducers({
   expenses: expensesReducer,
   auth: authReducer,
   filters: filtersReducer,
   lang: langReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// store.dispatch(setLanguage(Localization.locale));

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

   if (!dataLoaded) {
      return (
         <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
         />
      );
   }

   return (
      <Provider store={store}>
         <AppNavigator />
      </Provider>
   );
}
