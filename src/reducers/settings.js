'use strict';

import c from "../constants"

/**
 * Debating on wether to keep settings state in <Settings /> or in store I chose
 * store b/c of debuggability with react-redux devtools.
 */

const initState = {
  rating: "G",
  limit: 25,
  lang: "en"
}

let settingsAlreadyLoaded = false

// loadFromDisk()
// saveToDisk()

export default function(state = initState, action) {
  let { type } = action
  let ret
  switch (type) {
    case c.LOAD_SETTINGS:
      if (settingsAlreadyLoaded) return state
      settingsAlreadyLoaded = true
      try {
        // ret = loadFromDisk()
        ret =  Object.assign({}, state, ret)
      } catch (err) {
        // TODO: don't return the same state, modify it with the correct one
        // just don't save it cause... we can't, but keep the modified settings
        // while the user has the extension open
        console.error("unable to load from disk")
        ret = state
      }
      return ret
      break;

    case c.MODIFY_SETTINGS:
      let {name, value} = action
      // TODO: validate 1. field in settings exists, 2. value is proper
      ret = Object.assign({}, state, { [name]: value })
      // saveToDisk(serialize(ret))
      return ret
      break;

    default:
      return state
  }
}
