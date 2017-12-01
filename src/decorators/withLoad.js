'use strict';

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import actions from "../actions"
const { load } = actions

let _LoadWrapper
// FIXME: this.props will pass this.props.children which shoulnd't
const LoadWrapper =
function loadWrapper(props) {
  let {load, Wrapped} = props
  return React.createElement(Wrapped, Object.assign({}, {load}, props))
}

LoadWrapper.propTypes = {
  load: PropTypes.func.isRequired
}

_LoadWrapper = connect((_, {children}) => ({
  Wrapped: children
}), {load})(LoadWrapper)

function withLoad(Wrapped) {
  return (props) => {
    return (
      <_LoadWrapper {...props}>
        { Wrapped }
      </_LoadWrapper>
    )
  }
}

export default withLoad
