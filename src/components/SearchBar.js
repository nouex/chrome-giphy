

import React from 'react';
// import Reset from 'react-icons/lib/md/close';
import PropTypes from "prop-types"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "Search"
    }
    this.onSubmit = this.handleSubmit.bind(this)
    this.onChange = this.handleChange.bind(this)
    this.onFocus = this.handleFocus.bind(this)
    this.props.setQuery(this.state.value)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    const {onSubmit} = this.props,
          {value} = this.state
    onSubmit(value)
  }

  handleChange(ev) {
    this.setState({
      value: ev.target.value
    })
  }

  handleFocus(ev) {
    ev.target.select()
  }

  render() {
    return (
      <div className="bg-tertiary px-4 py-2 mt-2">
        <form  onSubmit={this.onSubmit}>
          <input  className="text-secondary" type="text"
                  value={this.state.value} onChange={this.onChange}
                  onFocus={this.onFocus}/>
          {/* TODO: no submit btn, submit on enter and test it */}
          <input type="submit" value="Submit" style={{display: "none"}}/>
          {/* <Icon icon={Reset}/> */}
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired
}

export default SearchBar
