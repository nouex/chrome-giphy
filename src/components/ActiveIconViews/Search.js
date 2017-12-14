'use strict';

import React from "react"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import SearchBar from "../SearchBar"
import withScrollBottomLoad from "../../decorators/withScrollBottomLoad"
import withSearchQuery from "../../decorators/withSearchQuery"
import withSpinner from "../../decorators/withSpinner"
import withRequestParams from "../../decorators/withRequestParams"
import withLoad from "../../decorators/withLoad"
import withStickerMode from "../../decorators/withStickerMode"
import PropTypes from "prop-types"
import {compose} from "redux"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.handleSubmit.bind(this)
    this.onSetQuery = this.setQuery.bind(this)
  }

  handleSubmit(query) {
    const { activeIcon, load, onQueryChange } = this.props
    onQueryChange(query, () => load(true, "search"))
  }

  setQuery(query) {
    const { onQueryChange } = this.props
    onQueryChange(query)
  }

  render() {
    const {searchQuery} = this.props
    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} setQuery={this.onSetQuery}/>
        <Recents />
        <Currents activeIcon="search" searchQuery={searchQuery}/>
      </div>
    )
  }
}

Search.propTypes = {
  activeIcon: PropTypes.string.isRequired,
  load: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
}

export default compose(withLoad, withRequestParams, withSpinner, withStickerMode, withSearchQuery, withScrollBottomLoad)(Search)
