'use strict';

import c from "../constants"

export function loadSettings() {
  return {
    type: c.LOAD_SETTINGS
  }
}

export function modifySettings(name, value) {
  return {
    type: c.MODIFY_SETTINGS,
    name,
    value
  };
}
