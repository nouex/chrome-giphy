

import React from "react"
import PropTypes from "prop-types"
import Icon from "./Icon"
import Toggle from "react-icons/lib/fa/smile-o"

const StickerModeToggle = ({mode, onClick}) => (
  <div onClick={onClick} className="d-inline float-right">
      <Icon icon={Toggle}
            textColor="text-primary"
            active={ mode }
            title="Sticker mode"/>
  </div>)

StickerModeToggle.propTypes = {
    mode: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default StickerModeToggle
