'use strict';

import c from "../constants"
import hasChromeStorage from "has-chrome-storage"

// TODO: make sure we've got hasChromeStorage right

/**
 * Debating on wether to keep settings state in <Settings /> or in store I chose
 * store b/c of debuggability with react-redux devtools.
 */

 // QUESTION: does reac-redux do a shallow compare of the returned
 // state or a a === b to determine if things changed??

const initState = {
  rating: "G",
  limit: 25,
  lang: "en"
}

let settingsAlreadyLoaded = false


function loadFromDisk(dispatch) {
  // 'chrome' is not defined
  let chrome = window.chrome || {}
  if (!hasChromeStorage) return false
  chrome.storage.sync.get("settings", (s) => {
    // if not runtime.lastError is related
    dispatch({
      type: c.LOAD_SETTINGS_DISK_CB,
      er: null, // TODO: check runtime.lastError
      settings: deserialize(s)
    })
    // else: at least console.eror(e)
  })
  return true
}

function saveToDisk(o, dispatch) {
  // 'chrome' is not defined
  let chrome = window.chrome || {}
  if (!hasChromeStorage) return false
  chrome.storage.sync.set("settings", serialize(o), () => {
    // if no error
    dispatch({
      type: c.MODIFY_SETTINGS_DISK_CB,
      er: null // FIXME
    })
    // else: console.error()
  })
  return true
}

function deserialize(s) {
  return JSON.parse(s)
}

function serialize(o) {
  return JSON.serialize(o)
}

export default function(state = initState, action) {
  let { type } = action, ret

  switch (type) {
    // QUESTION: why not use a thunk instead of dispatchid LOAD_SETTINGS
    case c.LOAD_SETTINGS:
      if (!settingsAlreadyLoaded) {
        settingsAlreadyLoaded = true
        loadFromDisk()
      }
      return state
      break;

    case c.MODIFY_SETTINGS:
      let {name, value} = action
      // TODO: validate 1. field in settings exists, 2. value is proper
      ret = Object.assign({}, state, { [name]: value })
      saveToDisk(ret)
      return ret
      break;

    case c.LOAD_SETTINGS_DISK_CB:
      if (action.er === null)
        return Object.assign({}, action.settings)
       else
        return state
       break;

    case c.MODIFY_SETTINGS_DISK_CB:
      // do we care if action.er
      return state
      break;

    default:
      return state
  }
}
