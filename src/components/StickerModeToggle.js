'use strict';

import React from "react"
import PropTypes from "prop-types"
import Icon from "./Icon"
import Toggle from "react-icons/lib/fa/smile-o"

class StickerModeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.onClick = this.handleClick.bind(this)
  }

  handleClick() {
    // ...
    this.props.onClick()
  }

  render() {
    let {mode, onClick} = this.props
    return (
      <div onClick={this.onClick} className="d-inline float-right" title="sticker mode toggle">
          <Icon icon={Toggle}
                textColor="text-primary"
                active={ mode }/>
      </div>
     )
  }
}

StickerModeToggle.propTypes = {
    mode: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default StickerModeToggle
