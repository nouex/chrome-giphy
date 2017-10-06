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

function withQuery(Wrapped) {
  return class SearchWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: null
      }
      this.onQueryChange = this.handleQueryChange.bind(this)
    }

    handleQueryChange(val) {
      this.setState({
        query: val
      })
    }

    render() {
      const passedProps = Object.assign({}, this.props, {
        onQueryChange: this.onQueryChange,
        query: {q: this.state.query}
      })

      return (
        <div>
          <Wrapped {...passedProps}/>
        </div>
      )
    }
  }
}

export default withQuery
