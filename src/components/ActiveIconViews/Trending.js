'use strict';

import React from "react"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import withScrollBottomLoad from "../../decorators/withScrollBottomLoad"
import withPrefetch from "../../decorators/withPrefetch"
import withSpinner from "../../decorators/withSpinner"
import withQueries from "../../decorators/withQueries"
import withLoad from "../../decorators/withLoad"
import withStickerMode from "../../decorators/withStickerMode"
import { compose } from "underscore"
import PropTypes from "prop-types"

let Trending = () => {
  return (
    <div>
      <Recents />
      <Currents activeIcon="trending" />
    </div>
  )
}

Trending = compose(withLoad, withQueries, withSpinner, withStickerMode, withScrollBottomLoad, withPrefetch)(Trending)

export default Trending
