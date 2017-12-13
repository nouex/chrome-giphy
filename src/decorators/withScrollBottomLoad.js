'use strict';

import React from "react"
import PropTypes from "prop-types"
import $ from "jquery"

/**
 *  1. listen on 'scroll'
 *  2. once we get to the zone near the bottom, stop listening on 'scroll'
 *  3. load more data
 *  4. wait for new data to come in
 *  5. make sure the new data has been rendered so we are out of the zone
 *  6. repeat -> 1
 */

 const zoneHeight = 100
 const waitForRenderTime = 1000 // 1 sec ? idk

function withScrollBottomLoad(Wrapped) {
  class ScrollBottomLoadWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.onScroll = this.handleScroll.bind(this)
      this.scrollEvOn = true
      this.pagination = 1
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    }

    load() {
      let { activeIcon, query, load, pagination } = this.props
      // query = query.q

      load( false, activeIcon, query,
            this.onLoadReqComplete.bind(this), this.pagination++ )
    }

    // 4.
    onLoadReqComplete() {
      // 5. how do we know the new data has been rendered ?
      //    for now we wait just about enough for react to render it
      window.setTimeout(() => {
        this.scrollEvOn = true // 6.
      }, waitForRenderTime)
    }

    handleScroll() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - zoneHeight) { // previously:  ($.fn.scrollTop.call(window) + $.fn.height.call(window) > $.fn.height.call(document) - zoneHeight)
        if (this.scrollEvOn) { // 2.
          this.scrollEvOn = false
          this.load() // 3.
        }
      }
    }

    render() {
      const passedProps = this.props
      return (
        <div>
          <Wrapped {...passedProps}/>
        </div>
      )
    }
  }

  ScrollBottomLoadWrapper.propTypes = {
    activeIcon: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired,
    query: PropTypes.object//,
    // pagination: PropTypes.number
  }

  return ScrollBottomLoadWrapper
}

export default withScrollBottomLoad
