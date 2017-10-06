'use strict';

import React from 'react';
import Currents from "../components/Currents"
import { connect } from "react-redux"
import actions from "../actions"

const mapStateToProps = (state, ownProps) => ({
  currents: state.currents[ownProps.activeIcon],
  activeIcon: ownProps.activeIcon
})

const _Currents = connect(mapStateToProps)(Currents)

export default _Currents
