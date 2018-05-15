

import Grid from "../components/Grid"
import { connect } from "react-redux"
import actions from "../actions"

const select = actions.select

const _Grid = connect((_, own) => ({enableKeyMovement: own.enableKeyMovement}), {select})(Grid)

export default _Grid
