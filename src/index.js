'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css"
import reducer from "./reducers"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const store = createStore(reducer, applyMiddleware(thunk))

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
