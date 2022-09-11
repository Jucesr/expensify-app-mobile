import React, {useState} from 'react';
import AppNavigator from './navigation/AppNavigator';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import * as Localization from 'expo-localization';
import 'moment/locale/es';
import labels from './constants/labels';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

//  Reducers
import expensesReducer from './store/reducers/expenses';
import authReducer from './store/reducers/auth';
import filtersReducer from './store/reducers/filters';
import langReducer from './store/reducers/lang';
import cardReducer from './store/reducers/cards';
import categoryReducer from './store/reducers/categories';
import {setLanguage} from './store/actions/lang';

const rootReducer = combineReducers({
   categories: categoryReducer,
   cards: cardReducer,
   expenses: expensesReducer,
   auth: authReducer,
   filters: filtersReducer,
   lang: langReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
i18n
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      resources: labels,
      lng: Localization.locale,
      // lng: locale,
      keySeparator: '.', // we do not use keys in form messages.welcome

      interpolation: {
         escapeValue: false, // react already safes from xss
      },
   });

store.dispatch(setLanguage(Localization.locale));

const fetchFonts = () => {
   return Font.loadAsync({
      'montserrat-blackitalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
      'roboto-blackitalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      roboto: require('./assets/fonts/Roboto-Regular.ttf'),
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
