

import React from 'react';

// FIXME: this temporary passing down of known props is shameful, use an hoc
// for that passed unknonw props down

/**
 * props passed down naturally b/c of pass-down-unkown contract
 *  + onClick
 *  + title
 *
 * props digeste by <Icon />
 *  + textColor (-> txtClr)
 *  + display
 *  + mr (mr -> margin)
 *  + active
 */

const Icon = (props) => {
   let o = Object.assign({
     textColor: "text-secondary",
     display: "d-inline",
     mr: "mr-3",
   }, props),
      className =
        `icon ${o.textColor} ${o.display} ${o.mr} ${o.active ? "active" : ""}`,
      propsClone = Object.assign({}, o)
  // NOTE: cloned from `o` not `props` b/c i believe deleting non-existent
  // props throws in strict mode

  delete propsClone.icon
  delete propsClone.textColor
  delete propsClone.display
  delete propsClone.mr
  delete propsClone.active

  return (
    <div className={className}
         {...propsClone}
         style={{
           cursor: "pointer"
         }}>
      { React.createElement(props.icon) }
    </div>
  )
}

export default Icon
