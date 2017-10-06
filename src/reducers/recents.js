'use strict';

import c from "../constants"

const initState = [],
      stackSize = 8

export default function(state = initState, action) {
  switch (action.type) {
    case c.SELECT:
      let imgObj, id1, shouldAdd, ret
      imgObj = action.imgObj
      id1 = imgObj.id
      shouldAdd = true
      shouldAdd = state.length ?
                    !state.some(({ id }) => id1 === id) :
                    shouldAdd
      if (shouldAdd) {
        ret = [].slice.call(state) // shallow copy
        ret.unshift(imgObj) // stack push
        ret.length = stackSize // stack size limit
      } else {
        ret = state
      }
      return ret;
      break;

    default:
      return state
  }
}
