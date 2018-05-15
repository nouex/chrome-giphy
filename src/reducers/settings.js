

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
  if (!hasChromeStorage) return false
  window.chrome.storage.sync.get("settings", (o) => {
    let { settings } = o,
        isNoOp = false
    if (settings === undefined) isNoOp = true
    dispatch({
      type: c.LOAD_SETTINGS_DISK_CB,
      settings: isNoOp ? void(0) : deserialize(settings),
      isNoOp,
      er: window.chrome.runtime.lastError
    })
  })
  return true
}

function saveToDisk(o, dispatch) {
  if (!hasChromeStorage) return false
  window.chrome.storage.sync.set({"settings": serialize(o)}, () => {
    dispatch({
      type: c.MODIFY_SETTINGS_DISK_CB,
      er: window.chrome.runtime.lastError
    })
  })
  return true
}

function deserialize(s) {
  return JSON.parse(s)
}

function serialize(o) {
  return JSON.stringify(o)
}

export default function(state = initState, action) {
  let { type } = action, ret

  switch (type) {
    // QUESTION: why not use a thunk instead of dispatchid LOAD_SETTINGS
    case c.LOAD_SETTINGS:
      {
        let {dispatch} = action
        if (!settingsAlreadyLoaded) {
          settingsAlreadyLoaded = true
          loadFromDisk(dispatch)
        }
        return state
      }

    case c.MODIFY_SETTINGS:
      {
        let {name, value, dispatch} = action
        // TODO: validate 1. field in settings exists, 2. value is proper
        ret = Object.assign({}, state, { [name]: value })
        saveToDisk(ret, dispatch)
        return ret
      }

    case c.LOAD_SETTINGS_DISK_CB:
      {
        let { isNoOp, settings, er } = action
        if (er == null && !isNoOp) // NOTE: `==` intentional
          return Object.assign({}, settings)
        else {
          if (er) {
            console.error("chrome.lastError => ", er)
          }
          return state
        }
      }

    case c.MODIFY_SETTINGS_DISK_CB:
      {
        let { er } = action
        if (er) {
          console.error("chrome.lastError => ", er)
        }
        return state
      }

    default:
      return state
  }
}
