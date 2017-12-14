'use strict';

import React from "react"
import PropTypes from "prop-types"

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
      let passedQueries = Object.assign({}, optionalQueries[activeIcon], queries)
      this.props.load(shouldReplace, activeIcon, stickerMode, passedQueries, cb)
      requiredQueries[activeIcon].forEach((q) => {
        if (!(q in queries)) throw new Error(`query '${q}' is required`)
      }, null)
    }

    render() {
      const passedQueries = Object.assign({}, this.props, {load: this.proxyLoad})
      return <Wrapped {...this.props} {...passedQueries} />
    }
  }

  QueriesWrapper.propTypes = {
    load: PropTypes.func.isRequired
  }

  return QueriesWrapper
}

export default withRequestParams
