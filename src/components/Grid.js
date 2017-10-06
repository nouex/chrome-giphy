'use strict';

import React from 'react';
import PropTypes from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ActiveGridItem from "./ActiveGridItem"

// FIXME: mojseover or mouseenvet or ???
// FIXME: keypres or keydown ???

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAt: 0
    }
    this.onHover = this.handleHover.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)
    this.keydownDisabled = false
    this.maxInd = 0
    if (props.enableKeyMovement)
      this.registerKeyEvents()
  }

  registerKeyEvents() {
    document.addEventListener("keydown", this.onKeyDown)
  }

  unregisterKeyEvents() {
    document.removeEventListener("keydown", this.onKeyDown)
  }

  // NOTE: use 'code' not 'key' https://developers.google.com/web/updates/2016/04/keyboardevent-keys-codes
  handleKeyDown(ev) {
    /*** match for Enter ***/
    if (ev.code.toLowerCase() === "enter") {
      this.handleEnter()
    }

    /*** match for arrow keys */
    if (this.keydownDisabled) return
    let preposition, regex, method, match
    regex = /^Arrow(\w+)$/
    match = regex.exec(ev.code)
    if (!match) return // no match, we don't care about the key then
    preposition = match[1]
    method = this["handle" + preposition + "Arrow"]
    if (!method) return // another arrow key we are not aware of, don't care
    this.keydownDisabled = true
    setTimeout(() => {
      this.keydownDisabled = false
    }, 1000 / 6)
    ev.preventDefault()
    method.call(this)
  }

  handleGenericArrow(preposition) {
    let newInd, rowSize = 4, currInd = this.state.activeAt,
        min = 0, max = this.maxInd
    switch (preposition) {
      case "up":
        newInd = currInd - rowSize
        break;

      case "down":
        newInd = currInd + rowSize
        break;

      case "right":
        newInd = currInd +1
        break;

      case "left":
        newInd = currInd -1
        break;

      default:
        throw new Error("unkonwn preposition" + preposition)
    }

    if ((min > newInd) || (newInd > max)) return // out or range, no-op

    this.setState({
      activeAt: newInd
    })
  }

  handleDownArrow() {
    this.handleGenericArrow("down")
  }

  handleUpArrow() {
    this.handleGenericArrow("up")
  }

  handleLeftArrow() {
    this.handleGenericArrow("left")
  }

  handleRightArrow() {
    this.handleGenericArrow("right")
  }

  componentWillUnMount() {
    this.unregisterKeyEvents()
  }

  handleEnter() {
    let { activeAt } = this.state
    let { dataArr } = this.props
    let imgObj = dataArr[activeAt]
    if (!imgObj) return
    this.props.select(imgObj)
    this.handleClick(imgObj)
  }

  handleClick(imgObj) {
    this.props.select(imgObj)
  }

  handleHover(activeAt) {
    this.setState({
      activeAt
    })
  }

  render() {
    const { dataArr } = this.props
    const { activeAt } = this.state
    if (!dataArr) return null
    let maxInd = 0
    const giphs = dataArr.map((imgObj, ind) => {
      let img, id, ret, onActiveClick

      maxInd = ind
      img = imgObj.images.fixed_width_small// 100px w
      id = imgObj.id
      ret = (
        <CopyToClipboard key={id} text={img.url} onCopy={(t, res) => {console.log("copied ?", res)}}>
          <img width={img.width} height={img.height} src={img.url}
               className="giph" />
        </CopyToClipboard>
      )
      onActiveClick = (ev) => {
        this.handleClick(imgObj)
      }

      // FIXME: then active's first child willa lso have akey prop but shoul'dnt
      if (ind === activeAt) {
        ret = <ActiveGridItem key={id} onClick={onActiveClick}>{ret}</ActiveGridItem>
      } else {
        ret = <div onMouseOver={this.onHover.bind(void(0), ind)}>{ret}</div>
      }

      return ret
    }, null)
    this.maxInd = maxInd

    return (
        <div className="bg-tertiary d-flex flex-wrap">
          {giphs}
        </div>
      )
  }
}

Grid.propTypes = {
  dataArr: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}

export default Grid
