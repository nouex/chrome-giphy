'use strict';

import React from 'react';
import PropTypes from "prop-types"

const ActiveGridItem = ({onClick, children}) => {
  return (
    <div className="active giph" onClick={onClick}>
      {children}
    </div>
  )
}

ActiveGridItem.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ActiveGridItem
