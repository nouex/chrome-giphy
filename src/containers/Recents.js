

import Recents from "../components/Recents"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  recents: state.recents
})

const _Recents = connect(mapStateToProps)(Recents)

export default _Recents
