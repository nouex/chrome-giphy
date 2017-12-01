'use strict';

import c from "../constants"

function select(value) {
  return {
    type: c.SET_ACTIVE_ICON,
    value
  }
}

export default select
