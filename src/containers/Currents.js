

import Currents from "../components/Currents"
import { connect } from "react-redux"

const mapStateToProps = (state, ownProps) => ({
  currents: state.currents[ownProps.activeIcon],
  activeIcon: ownProps.activeIcon
})

const _Currents = connect(mapStateToProps)(Currents)

export default _Currents
