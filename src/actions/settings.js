

import c from "../constants"

export function loadSettings(dispatch) {
  return {
    type: c.LOAD_SETTINGS,
    dispatch
  }
}

export function modifySettings(name, value, dispatch) {
  return {
    type: c.MODIFY_SETTINGS,
    name,
    value,
    dispatch
  };
}
