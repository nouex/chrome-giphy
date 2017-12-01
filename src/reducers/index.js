'use strict';

import { combineReducers } from "redux"
import currents from "./currents"
import recents from "./recents"
import setActiveIcon from "./setActiveIcon"

const reducers = {
  currents,
  recents,
  activeIcon: setActiveIcon
}

export default combineReducers(reducers)
