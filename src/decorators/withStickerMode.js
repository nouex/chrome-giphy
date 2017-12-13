'use strict';

import React from "react"
import PropTypes from "prop-types"

// NOTE: our `shouldReplace` trumps all others down the composition chain
// TODO: test changes to state.prevStickerMode
// FIXME: alternative to setState() when we want to "unmask" props.load(),
//        see test for details

function withStickerToggle(Wrapped) {
  class StickerToggleWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        prevStickerMode: props.stickerMode
      }
    }

    getMaskedLoad(shouldReplace, stickerMode) {
      return (...args) => {
        args = [shouldReplace].concat(args.slice(1))
        args.splice(2, 0, stickerMode)
        this.props.load.apply(null, args)
        this.setState({prevStickerMode: stickerMode})
      }
    }

    getUnmaskedLoad(stickerMode) {
      return (...args) => {
        args.splice(2, 0, stickerMode)
        this.props.load.apply(null, args)
      }
    }

    prepLoadProxy() {
      let {stickerMode} = this.props,
          {prevStickerMode} = this.state
      if (stickerMode !== prevStickerMode && prevStickerMode !== null) {
        this.loadProxy = this.getMaskedLoad(true, stickerMode)
      } else {
        this.loadProxy = this.getUnmaskedLoad(stickerMode)
      }
    }

    render() {
      const propsClone = Object.assign({}, this.props)
      delete propsClone.stickerMode
      this.prepLoadProxy()
      const filteredProps = Object.assign({}, propsClone, {load: this.loadProxy})
      return <Wrapped {...filteredProps} />
    }
  }

  StickerToggleWrapper.propTypes = {
    stickerMode: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired
  }

  return StickerToggleWrapper
}


export default withStickerToggle
