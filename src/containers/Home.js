

import { connect } from "react-redux"
import actions from "../actions"
import Home from "../components/Home"
const { setActiveIcon } = actions

const _Home = connect(undefined, {setActiveIcon})(Home);

export default _Home
