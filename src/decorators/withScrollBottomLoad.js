

import React from "react"
import PropTypes from "prop-types"
import BottomScrollListener from "react-bottom-scroll-listener"

function withScrollBottomLoad(Wrapped) {
  class ScrollBottomLoadWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.boundLoad = this.load.bind(this)
      // TODO: make load() no-op if isLoading === true
    }

    load() {
      let { activeIcon, load } = this.props
      load( false, activeIcon)
    }

    render() {
      return (
      <BottomScrollListener
        onBottom={this.boundLoad}
        offset={200}
        debounce={200}>
        <Wrapped {... this.props}/>
      </BottomScrollListener> )
    }
  }

  ScrollBottomLoadWrapper.propTypes = {
    activeIcon: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired
  }

  return ScrollBottomLoadWrapper
}

export default withScrollBottomLoad
