'use strict';

import React from 'react';
import SpinnerIcon from 'react-icons/lib/fa/spinner';

class Spinner extends React.Component {
  constructor() {
    super()
    this.state = {
      deg: 0
    }
  }

  componentDidMount() {
    this.mounted = true
    this.spin()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  spin() {
    if (!this.mounted) return;
    let { deg } = this.state,
        nextDeg = 25 + deg
    nextDeg > 360 ? nextDeg = nextDeg - 360 : void null
    this.setState({
      deg: nextDeg
    })
    setTimeout(this.spin.bind(this), 60)
  }

  render() {
    return (
      <SpinnerIcon style={{
        transform: `rotate(${this.state.deg}deg)`,
        backgroundColor: "red"
      }}/>
    )
  }
}

export default Spinner
