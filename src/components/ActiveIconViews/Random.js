'use strict';

import React from "react"
import Refresh from "../Refresh"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import withPrefetch from "../../decorators/withPrefetch.js"
import withQueries from "../../decorators/withQueries"
import withLoad from "../../decorators/withLoad"
import withStickerMode from "../../decorators/withStickerMode"
import PropTypes from "prop-types"
import { compose } from "underscore"

let Random = ({ load }) => {
  const handleRefresh = () => {
    load(true, "random")
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
  load: PropTypes.func.isRequired
}

Random = compose(withLoad, withQueries, withStickerMode, withPrefetch)(Random)

export default Random
