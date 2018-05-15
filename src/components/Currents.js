

import React from 'react';
import Grid from "../containers/Grid"
import PropTypes from "prop-types"
import Icon from "./Icon"
import GridIcon from 'react-icons/lib/fa/th';

const Currents = ({currents, searchQuery, activeIcon}) => {
  let resultsFor = searchQuery ? (<q>{searchQuery}</q>) : null;
  let resultsTitle
  switch (activeIcon) {
    case "search":
    case "translate":
      resultsTitle = <span>Results {resultsFor ? "for " : "" }{resultsFor}</span>
      break;

    default:
      resultsTitle = <span>{activeIcon[0].toUpperCase() + activeIcon.slice(1)}</span>
  }

  return (
    <div className="bg-tertiary px-4 py-2">
      <Icon icon={GridIcon} mr="mr-1"/>
      {resultsTitle}
      <Grid dataArr={currents} enableKeyMovement={true}/>
    </div>
  )
}

/* FIXME: null or undefined for non-filled current
 FIXME: currents: [PropTypes.array.isRequired, PropTypes.null.isRequired], */

Currents.propTypes = {
  activeIcon: PropTypes.string.isRequired
}

export default Currents
