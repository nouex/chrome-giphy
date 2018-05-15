

import c from "../constants"

const initState = "search"

export default function(state = initState, action) {
  switch (action.type) {
    case c.SET_ACTIVE_ICON:
      return action.value

    default:
      return state
  }
}
