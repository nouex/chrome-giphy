'use strict';

import React from "react"
import PropTypes from "prop-types"

function withPrefetch(Wrapped) {
  class PrefetchWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const  { activeIcon, stickerMode, load, query, needsPrefetch } = this.props
      if (needsPrefetch) load(false, activeIcon, stickerMode, query)
    }

    render() {
      const passedProps = this.props

      return (
        <div>
          <Wrapped {...passedProps}/>
        </div>
      )
    }
  }

  PrefetchWrapper.propTypes = {
    activeIcon: PropTypes.string.isRequired,
    stickerMode: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    needsPrefetch: PropTypes.bool.isRequired//,
    //FIXME query: PropTypes.oneOfType([PropTypes.string, null])
  }

  return PrefetchWrapper
}

export default withPrefetch
