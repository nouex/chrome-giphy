'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css"
import reducer from "./reducers"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}


ReactDOM.render(
  (<Provider store={store}><App /></Provider>),
  document.getElementById('root'));
