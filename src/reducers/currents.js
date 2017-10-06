'use strict';

import c from "../constants"

const initState = {
  search: [],
  translate: [],
  trending: [],
  random: []
}

export default function(state = initState, action) {
  let { activeIcon, data } = action
  switch (action.type) {
    case c.CURRENT_APPEND:
      return Object.assign({}, state, { [activeIcon]: state[activeIcon].concat(data) })
      break;

    case c.CURRENT_REPLACE:
      return Object.assign({}, state, { [activeIcon]: data })
      break;

    default:
      return state
  }
}
