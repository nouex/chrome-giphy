'use strict';

import React from 'react';
import NavBar from "./NavBar"
import Home from "../containers/Home"
import Settings from "./Settings"

const views = { home: Home, settings: Settings }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "home"
    }
    this.onViewChange = this.handleViewChange.bind(this)
  }

  handleViewChange(view) {
    this.setState({view})
  }

  render() {
    const { view } = this.state,
          viewComponent = views[view]

    return (
      <div style={{
        width: "484px",
        height: "520px"
      }}>
        <NavBar active={view} onChange={ this.onViewChange }/>
        { React.createElement(viewComponent) }
      </div>
    )
  }
}

export default App
