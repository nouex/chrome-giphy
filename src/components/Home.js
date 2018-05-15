

import React from "react"
import IconSelector from "./IconSelector"
import PropTypes from "prop-types"
import Search from "./ActiveIconViews/Search"
import Translate from "./ActiveIconViews/Translate"
import Random from "./ActiveIconViews/Random"
import Trending from "./ActiveIconViews/Trending"
import StickerModeToggle from "./StickerModeToggle"

const activeIconViews = {
  "search": Search,
  "translate": Translate,
  "random": Random,
  "trending": Trending
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIcon: "search",
      stickerMode: false
    }
    this.onIconChange = this.handleIconChange.bind(this)
    this.onStickerModeToggleClick = this.handleStickerModeToggleClick.bind(this)
  }

  handleIconChange(val) {
    this.props.setActiveIcon(val)
    this.setState({
      activeIcon: val
    })
  }

  handleStickerModeToggleClick() {
    this.setState({
      stickerMode: !this.state.stickerMode
    })
  }

  render() {
    const {
      activeIcon,
      stickerMode
    } = this.state

    return (
      <div>
        <div className="bg-secondary px-4 py-2 ">
          <IconSelector onChange={this.onIconChange}/>
          <StickerModeToggle mode={stickerMode}
                             onClick={this.onStickerModeToggleClick}/>
        </div>
        { React.createElement(activeIconViews[activeIcon], {stickerMode, activeIcon}) }
      </div>
    )
  }
}

Home.propTypes = {
  setActiveIcon: PropTypes.func.isRequired
}

export default Home
