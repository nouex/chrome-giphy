'use strict';

/**
 * Problem: withScrollBottomLoad() and withPrefetch() make use of 'query' if the
 *  wrapped component being rendered is e.g. <Search />.  How do we pass 'query'
 *  from a wrapped component.
 *
 * Solution: You shouldn't. Instead bring state up.
 */

import React from "react"
import PropTypes from "prop-types"

function withSearchQuery(Wrapped) {
  class SearchWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: ""
      }
      this.onQueryChange = this.handleQueryChange.bind(this)
    }

    handleQueryChange(val, cb) {
      this.setState({
        query: val
      }, cb)
    }

    load(shouldReplace, activeIcon) {
      this.props.load(shouldReplace, activeIcon, {q: this.state.query})
    }

    render() {
      const passedProps = Object.assign({}, this.props, {
        onQueryChange: this.onQueryChange,
        searchQuery: this.state.query,
        load: this.load.bind(this)
      })

      return (
        <div>
          <Wrapped {...passedProps}/>
        </div>
      )
    }
  }

  SearchWrapper.propTypes = {
    load: PropTypes.func.isRequired
  }

  return SearchWrapper
}

export default withSearchQuery
