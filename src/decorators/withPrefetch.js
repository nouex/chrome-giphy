'use strict';

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

let _PrefetchWrapper

class PrefetchWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const  { activeIcon, load, query, needsPrefetch } = this.props
    if (needsPrefetch) load(false, activeIcon, query)
  }

  render() {
    const Wrapped = this.props.children
    const {
    activeIcon, load, query} = this.props
    const passedProps = { load }
    return <Wrapped {...passedProps}/>
  }
}

PrefetchWrapper.propTypes = {
  load: PropTypes.func.isRequired
}

// TODO: we are receiving activeIcon from props and context.store, can we
// reduce it to just props.activeIcon ???
_PrefetchWrapper = connect(
  (state, {children}) => {
    let { activeIcon, currents } = state
    return ({
          needsPrefetch: currents[activeIcon].length === 0,
          Wrapped: children
    })
  }
)(PrefetchWrapper)

function withPrefetch(Wrapped) {
  return (props) => {
    return <_PrefetchWrapper {...props}>{Wrapped}</_PrefetchWrapper>
  }
}

export default withPrefetch
