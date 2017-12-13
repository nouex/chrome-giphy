'use strict';

import React from "react"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import SearchBar from "../SearchBar"
import withScrollBottomLoad from "../../decorators/withScrollBottomLoad"
import withQuery from "../../decorators/withQuery"
import withSpinner from "../../decorators/withSpinner"
import withQueries from "../../decorators/withQueries"
import withLoad from "../../decorators/withLoad"
import withStickerMode from "../../decorators/withStickerMode"
import PropTypes from "prop-types"
import {compose} from "underscore"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.handleSubmit.bind(this)
    this.onSetQuery = this.setQuery.bind(this)
  }

  handleSubmit(query) {
    const { activeIcon, load, onQueryChange } = this.props
    load(true, "search", {q: query})
    onQueryChange(query)
  }

  setQuery(query) {
    const { onQueryChange } = this.props
    onQueryChange(query)
  }

  render() {
    const {query} = this.props
    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} setQuery={this.onSetQuery}/>
        <Recents />
        <Currents activeIcon="search" qName={query.q}/>
      </div>
    )
  }
}

Search.propTypes = {
  activeIcon: PropTypes.string.isRequired,
  load: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
}

export default compose(withLoad, withQueries, withSpinner, withStickerMode, withQuery, withScrollBottomLoad)(Search)