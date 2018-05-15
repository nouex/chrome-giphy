

/**
 * TODO: copy/paste from SEarch.js
 */

import React from "react"
import Recents from "../../containers/Recents"
import Currents from "../../containers/Currents"
import SearchBar from "../SearchBar"
import withScrollBottomLoad from "../../decorators/withScrollBottomLoad"

let Translate = () => {
  return (
    <div>
      <SearchBar />
      <Recents />
      <Currents activeIcon="translate"/>
    </div>
  )
}

Translate = withScrollBottomLoad(Translate)

export default Translate
