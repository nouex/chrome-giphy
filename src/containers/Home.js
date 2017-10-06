'use strict';

import React from 'react';
import Home from "../components/Home"
import { connect } from "react-redux"
import actions from "../actions"
let { load } = actions

const _Home = connect((state, own) => {
  return {
    currents: state.currents
  }
}, { load })(Home)

export default _Home
