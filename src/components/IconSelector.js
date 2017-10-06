'use strict';

import React from 'react';
import Icon from "./Icon"
import Search from 'react-icons/lib/go/search';
import Translate from 'react-icons/lib/fa/globe';
import Random from "react-icons/lib/fa/random"
import Trending from "react-icons/lib/go/flame"
import PropTypes from "prop-types"
// TODO: props.selectedType

class IconSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "search"
    }
  }

  render() {
    let { value } = this.state,
        icons = [ [Search, "search"], /*[Translate, "translate"],*/
                  [Trending, "trending"], [Random, "random"] ]
                  .map((pair) => {
                    let [icon, name] = pair,
                        handleClick = () => {
                          if (name === this.state.value) return
                          this.setState({
                            value: name
                          })
                          console.log("value 2222", name)
                          this.props.onChange(name)
                        }

                    return (
                      <div
                        onClick={ handleClick }
                        key= { name }
                        className="d-inline">
                          <Icon icon={icon}
                                textColor="text-primary"
                                active={ value === name ? true : false }/>
                      </div>
                    )
                  })

    return (
      <div className="d-inline" onClick={this.onClick}>
          {/* TODO: set aria roles as select */}
          { icons }
      </div>
    )
  }
}

IconSelector.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default IconSelector
