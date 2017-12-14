'use strict';

import React from "react"
import PropTypes from "prop-types"
import Spinner from "../components/Spinner"

function withSpinner(Wrapped) {
  class SpinnerWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoadingMore: false
      }
    }

    load(shouldReplace) {
      let noop = () => {}
      let otherOnLoad = noop
      let passedArgs = [].slice.call(arguments)

      if ( typeof arguments[arguments.length -1] === "function") {
          otherOnLoad = arguments[arguments.length -1]
          passedArgs.splice(passedArgs.length -1, 1)
      }

      const onLoad = () => {
        if (this.state.isLoadingMore)
          this.setState({
            isLoadingMore: false
          })
        otherOnLoad()
      }

      const origLoad = this.props.load
      // FIXME: what if it's already loading what then ???
        this.setState({
          isLoadingMore: true
        })

      // FIXME: last arg cb may be presetn check for it and if present
      //  wrap ours around it
      origLoad.apply(null, [].slice.call(passedArgs).concat(onLoad))
    }

    render() {
      const load = this.load.bind(this),
            passedProps = Object.assign({}, this.props, {load})

      const { isLoadingMore } = this.state

      return (
        <div>
          <Wrapped {...passedProps}/>
          { isLoadingMore ? <div className="mx-auto"><Spinner /></div> : null }
        </div>
      )
    }
  }

  SpinnerWrapper.propTypes = {
    load: PropTypes.func.isRequired
  }

  return SpinnerWrapper
}

export default withSpinner
