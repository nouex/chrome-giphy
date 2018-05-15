

import c from "../constants"

const initState = [],
      sizeLimit = 8,
      set = new Set()

export default function(queue = initState, action) {
  switch (action.type) {
    case c.SELECT:
      let { imgObj } = action,
          { id: imgId } = imgObj,
          ret

      if (!set.has(imgId)) {
        set.add(imgId)
        ret = [].slice.call(queue) // shallow copy
        ret.unshift(imgObj) // queue push
        ret.length = sizeLimit // queue size limit
      } else {
        ret = queue
      }
      return ret;

    default:
      return queue
  }
}
