'use strict';

import React from "react"
import Refresh from "../Refresh"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import withPrefetch from "../../decorators/withPrefetch.js"
import withQuery from "../../decorators/withQuery"
import withQueries from "../../decorators/withQueries"
import withLoad from "../../decorators/withLoad"
import PropTypes from "prop-types"
import { compose } from "underscore"

let Random = ({ load, stickerMode }) => {
  const handleRefresh = () => {
    load(true, "random", stickerMode, {})
  }

  return (
    <div>
      <Refresh onClick={handleRefresh}/>
      <Recents />
      <Currents activeIcon="random"/>
    </div>
  )
}

Random.propTypes = {
  load: PropTypes.func.isRequired,
  stickerMode: PropTypes.bool.isRequired
}

Random = compose(withLoad, withQueries, withQuery, withPrefetch)(Random)

export default Random
