'use strict';

import React from "react"
import Refresh from "../Refresh"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import withPrefetch from "../../decorators/withPrefetch.js"
import withRequestParams from "../../decorators/withRequestParams"
import withLoad from "../../decorators/withLoad"
import withStickerMode from "../../decorators/withStickerMode"
import PropTypes from "prop-types"
import { compose } from "redux"

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

Random = compose(withLoad, withRequestParams, withStickerMode, withPrefetch)(Random)

export default Random
