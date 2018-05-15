

import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

// FIXME: check that settings apply only to the correct endpts, giphy will
// most likely ignore unknown params but...
// NOTE: put them in the store if we need to, should def when we implement
//  the settings page
// NOTE: defaults are giphy api's defaults
const optionalQueries = {
  search: {
    limit: 25,
    offset: 0,
    rating: "G",
    lang: "en",
    fmt: "json"
  },
  translate: {
  },
  trending: {
    limit: 25,
    offset: 0,
    rating: "G",
    fmt: "json"
  },
  random: {
    // tag: "",
    rating: "G",
    fmt: "json"
  }
}

const settingsTransformers = [
  function ratingTransformer(s, o) {o.rating = s.rating},
  function limitTransformer(s, o) {o.limit = s.limit},
  function langTransformer(s, o) {o.lang = s.lang}
]

const requiredQueries = {
  search: ["q"],
  translate: ["s"],
  trending: [],
  random: []
}

function withRequestParams(Wrapped) {
  class QueriesWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.proxyLoad = (...args) => this.load.apply(this, args)
    }

    load(shouldReplace, activeIcon, stickerMode, queries, cb) {
      if (typeof queries === "function" || queries === undefined) {
        if (typeof queries === "function") {
          cb = queries
        }
        queries = {}
      }

      // merg default (optional) queries with component-specific queries
      let q = Object.assign({}, optionalQueries[activeIcon], queries)

      // apply settings transformers
      for (let t of settingsTransformers) {
        t(this.props.settings, q)
      }

      // check for required component-specific queries
      requiredQueries[activeIcon].forEach((_q) => {
        if (!(_q in q)) throw new Error(`query '${_q}' is required`)
      }, null)

      this.props.load(shouldReplace, activeIcon, stickerMode, q, cb)
    }

    render() {
      const passedProps = Object.assign({}, this.props, {load: this.proxyLoad})
      return <Wrapped {...this.props} {...passedProps} />
    }
  }

  QueriesWrapper.propTypes = {
    load: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  }

  return connect(
    (s) => ({settings: s.settings})
  )(QueriesWrapper)
}

export default withRequestParams
