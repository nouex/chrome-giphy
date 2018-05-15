

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import actions from "../actions"
const { load } = actions

// FIXME: this.props will pass this.props.children which shoulnd't
const LoadWrapper =
function loadWrapper(props) {
  let {load, Wrapped} = props
  return React.createElement(Wrapped, Object.assign({}, {load}, props))
}

LoadWrapper.propTypes = {
  load: PropTypes.func.isRequired
}

const LoadWrapperConnected = connect((_, {children}) => ({
  Wrapped: children
}), {load})(LoadWrapper)

function withLoad(Wrapped) {
  return (props) => {
    return (
      <LoadWrapperConnected {...props}>
        { Wrapped }
      </LoadWrapperConnected>
    )
  }
}

export default withLoad
