import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

// Debugger
import {composeWithDevTools} from "redux-devtools-extension"


import ReduxThunk from "redux-thunk"

import PlacesNavigator from './navigation/PlacesNavigator'
import placesReducer from './store/places-reducer'
import {init} from './helpers/db'



init()
  .then(() => {
    console.log('Initialized database.');
  }).catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  })

const rootReducer = combineReducers({
  places: placesReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <PlacesNavigator />
    </Provider>
  );
}

export default App
