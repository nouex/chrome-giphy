'use strict';

import React from "react"
import PropTypes from 'prop-types';
import actions from "../actions"
import { Form, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap"

/**
 * PROBLEM: reducers/settings.js requires dispatch(), how do we access dispatch?
 * SOLUTION: the component that invokes the action creator that invokes the
 * settings reducer will pass dispatch(), but for this we need to use
 * connect()'s param signature that omits the 2nd arg (mapDispatchToProps) so
 * that we have props.dispatch(), we then bind the actions creators that were
 * previously bound using connect() right here.
 *
 * Obviosly this is ugly and we should think of a different way to structure
 * it.
 */

// FIXME: TIL media queries don't work in popup pages, bootstrap classes such as
// col-sm-* won't work
// TODO: wait after there's a change to an input until we save it do
// disk

class Settings extends React.Component {
  constructor(p) {
    super(p)
    this.loadSettings =
      () => this.props.dispatch(actions.loadSettings(this.props.dispatch))
    this.modifySettings =
      (n, v) => this.props.dispatch(actions.modifySettings(n , v, this.props.dispatch))
  }

  // QUESTION: changing views in <App /> does not cause Settings to
  // unmount does it???
  componentWillMount() {
    this.loadSettings()
  }

  render() {
    // TODO: use react-bootstrap components
    const comp = this,
          {settings} = this.props

    return (
      <Form horizontal className="px-4 py-2">
        <FormGroup controlId="rating-input">
          <ControlLabel className="col-sm-4">Rating:</ControlLabel>
          <FormControl
            className="col-sm-1"
            componentClass={
              () => (
                <select onChange={createModifier("rating", targetValueSelector)}
                        id="rating-input"
                        value={settings.rating}
                        className="col-sm-1" >
                  <option value="Y">Y</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="R">R</option>
                </select>)
              } />
        </FormGroup>
        <FormGroup controlId="limit-input">
          <ControlLabel className="col-sm-4">Size Per Request:</ControlLabel>
          <FormControl type="number" value={settings.limit}
                       onChange={createModifier("limit", targetValueSelector)}
                       onSubmit={() => {/* avoid the default FIXME */}}
                       className="d-inline col-sm-2"
                       max="100"
                       min="0" />
        </FormGroup>
        <FormGroup controlId="lang-input">
          <ControlLabel className="col-sm-4">Language:</ControlLabel>
          <FormControl
            componentClass={
              () => (
                <select onChange={createModifier("lang", targetValueSelector)}
                        id="lang-input"
                        value={settings.lang}
                        className="col-sm-3" >
                 <option value="en">English</option>
                 <option value="es">Spanish</option>
                 <option value="pt">Portuguese</option>
                 <option value="id">Indonesian</option>
                 <option value="fr">French</option>
                 <option value="ar">Arabic</option>
                 <option value="tr">Turkish</option>
                 <option value="th">Thai</option>
                 <option value="vi">Vietnamese</option>
                 <option value="de">German</option>
                 <option value="it">Italian</option>
                 <option value="ja">Japanese</option>
                 <option value="zh-Cn">Chinese Simplified</option>
                 <option value="zh-TW">Chinese Traditional</option>
                 <option value="ru">Russian</option>
                 <option value="ko">Korean</option>
                 <option value="pl">Polish</option>
                 <option value="nl">Dutch</option>
                 <option value="ro">Romanian</option>
                 <option value="hu">Hungarian</option>
                 <option value="sv">Swedish</option>
                 <option value="cs">Czech</option>
                 <option value="hi">Hindi</option>
                 <option value="bn">Bengali</option>
                 <option value="da">Danish</option>
                 <option value="fa">Farsi</option>
                 <option value="tl">Filipino</option>
                 <option value="fi">Finnish</option>
                 <option value="iw">Hebrew</option>
                 <option value="ms">Malay</option>
                 <option value="no">Norwegian</option>
                 <option value="uk">Ukrainian</option>
                </select>
              )
            }/>
        </FormGroup>
      </Form>
    )

    function targetValueSelector({target: {value}}) {
      return value
    }

    function createModifier(name, valueSelector) {
      return (synEv) => {
        comp.modifySettings(name, valueSelector(synEv))
      }
    }
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Settings
