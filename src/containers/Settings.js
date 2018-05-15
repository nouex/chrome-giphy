

import Settings from "../components/Settings"
import { connect } from "react-redux"

const _Settings = connect(
  (state, ownProps) => ({
    settings: Object.assign({}, state.settings)
  })
)(Settings)

export default _Settings
