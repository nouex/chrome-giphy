'use strict';

import React from 'react';
import Settings from "../components/Settings"
import { connect } from "react-redux"
import actions from "../actions"

const _Settings = connect(
  (state, ownProps) => ({
    settings: Object.assign({}, state.settings)
  }),
  {
    // TODO: immport {loadSettings, modifySettings} = actions
    loadSettings: actions.loadSettings,
    modifySettings: actions.modifySettings
  }
)(Settings)

export default _Settings
