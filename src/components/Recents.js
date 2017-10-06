'use strict';

import React from 'react';
import Icon from "./Icon"
import Clock from 'react-icons/lib/fa/clock-o';
import Grid from "../containers/Grid"
import PropTypes from "prop-types"

const Recents = ({recents}) => (
  <div className="bg-tertiary px-4 py-2">
    <Icon icon={Clock} mr="mr-1"/><span>Recents</span>
    <Grid dataArr={recents}/>
  </div>
)

// FIXME: null or undefined for non-filled current
Recents.propTypes = {
  //FIXME: recents: [PropTypes.array.isRequired, PropTypes.null.isRequired]
}

export default Recents
