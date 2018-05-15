

import { combineReducers } from "redux"
import currents from "./currents"
import recents from "./recents"
import setActiveIcon from "./setActiveIcon"
import settings from "./settings"

const reducers = {
  currents,
  recents,
  activeIcon: setActiveIcon,
  settings
}

export default combineReducers(reducers)
