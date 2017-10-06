'use strict';

import { combineReducers } from "redux"
import currents from "./currents"
import recents from "./recents"

const reducers = {
  currents,
  recents,
}

export default combineReducers(reducers)
