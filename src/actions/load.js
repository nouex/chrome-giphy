'use strict';

import xhr from "xhr"
import c from "../constants"

const pagination = {
  search: 0,
  trending: 0
}

// NOTE: all params are required except cb
function load(shouldReplace, activeIcon, stickerMode, queries, cb) {
  return function (dispatch) {
    let search, uri

    cb = cb || (() => void(0))

    updatePagination(activeIcon, shouldReplace, pagination)

    // pagination
    activeIcon in pagination ?
      queries = applyPagination(queries, pagination[activeIcon]) :
      void(0)

    // format search part of uri
    search = formatQueries(queries)

    // format relative uri
    uri = formatURI(activeIcon, stickerMode, search)

    // prepend host:port
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
    // NOTE: do NOT add a trailing slash
    let hostPort
    if (process.env.NODE_ENV === "production") {
      const productionAddr = process.env.REACT_APP_PRODUCTION_ADDR
      if (typeof productionAddr !== "string") {
        // TODO: it'd be nice if we could run a script right before
        // `npm run build` that checks for this and refuses to build if not
        // present
        throw new Error("REACT_APP_PRODUCTION_ADDR was not set during build")
      } else {
        hostPort = productionAddr
      }
    } else {
      // NOTE: keep it relative when in development/test mode
      hostPort = ""
    }

    uri = hostPort + uri

    xhr({
      method: "GET",
      uri,
      json: true
      }, function (err, resp, body) {
          let data

          if (err)
            throw new Error("xhr error ", err.message)
          if (+resp.statusCode !== 200)
            throw new Error("xhr error status code" + resp.statusCode)

          data = normalizeData(body, activeIcon)
          dispatch({
            type: shouldReplace ? c.CURRENT_REPLACE : c.CURRENT_APPEND,
            activeIcon,
            data
          })
          cb()
        }
      )
  }

  function formatURI(activeIcon, stickerMode, search) {
    let resource = stickerMode ? "stickers" : "gifs"
    return `/v1/${resource}/${activeIcon}` + search
  }

  function applyPagination(queries, paginationN) {
    let ret = Object.assign({}, queries)
    ret.offset = (paginationN  * queries.limit)
    return ret;
  }

  function formatQueries(queries) {
    let str = "",
        first = true,
        val
    for (const key in queries) {
      if (queries.hasOwnProperty(key)) {
        if (first) {
          str += "?"
          first = false
        } else {
          str += "&"
        }
        val = encodeURIComponent(queries[key])
        str += `${key}=${val}`
      }
    }
    return str
  }

  function updatePagination(activeIcon, shouldReset, pagination) {
    shouldReset ?
      pagination[activeIcon] = 0 :
      pagination[activeIcon] += 1
  }

  function normalizeData(body, activeIcon) {
    switch (activeIcon) {
      case "search":
      case "trending":
      case "translate":
        return body.data
        break;

      case "random":
        // TEMP: ideally use unflatten()
        let img = ((body.data.images = {}).fixed_width_small = {});
        img.width = body.data.fixed_width_small_width
        img.height = body.data.fixed_width_small_height
        img.url = body.data.fixed_width_small_url
        return [body.data]
        break;

      default:
        throw new Error("unknown activeIcon")
    }

    function unflatten(imgObj) {
      const sep = "_", tO = {}

      for (const key in imgObj) {
        if (imgObj.hasOwnProperty(key)) {
          let val = imgObj[key],
              o = tO
          key.split(sep).forEach((key2, ind, arr) => {
              let final = ind === arr.length -1
              if (final) {
                o[key2] = val
              } else {
                let oo = o[key2]
                if (!oo) {
                  o[key2] = {}
                  o = o[key2]
                }
              }
          })
        }
      }
    }
  }
}

export default load
