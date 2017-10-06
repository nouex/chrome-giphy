'use strict';

import React from 'react';

// FIXME: this temporary passing down of known props is shameful, use an hoc
// for that passed unknonw props down

const Icon = (props) => {
  let {onClick} = props
  props = Object.assign({}, {
    textColor: "text-secondary",
    display: "d-inline",
    mr: "mr-3",
  },
  props,
  {
    active: props.active ? "active" : ""
  });

  return (
    <div className={(`icon ${props.textColor} ${props.display} ${props.mr} ${props.active}`)}
         onClick={onClick}
         style={{
           cursor: "pointer"
         }}>
      { React.createElement(props.icon) }
    </div>
  )
}

export default Icon
