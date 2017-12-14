'use strict';

import React from "react"
import PropTypes from 'prop-types';

// TODO: wait after there's a change to an input until we save it do
// disk

({settings, loadSettings, modifySettings}) => {
  return <h1>settings coming soon</h1>
}

class Settings extends React.Component {
  constructor(p) {
    super(p)
  }

  // QUESTION: changing views in <App /> does not cause Settings to
  // unmount does it???
  componentWillMount() {
    this.props.loadSettings()
  }

  render() {
    // TODO: use react-bootstrap components
    const comp = this,
          {settings} = this.props

    return (
      <form>
        <label htmlFor="rating-input">Rating
          <select onChange={createModifier("rating", targetValueSelector)}
                  id="rating-input"
                  value={settings.rating}>
            <option value="Y">Y</option>
            <option value="G" defaultValue>G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </label>
        <label htmlFor="limit-input">Request Limit
          <input id="limit-input" type="number" value={settings.value}
                 onChange={createModifier("limit", targetValueSelector)} />
        </label>
      </form>
    )

    function targetValueSelector({target: {value}}) {
      return value
    }

    function createModifier(name, valueSelector) {
      return (synEv) => {
        comp.props.modifySettings(name, valueSelector(synEv))
      }
    }
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  loadSettings: PropTypes.func.isRequired,
  modifySettings: PropTypes.func.isRequired
}

export default Settings
