'use strict';

import React from "react"
import withScrollBottomLoad from "./withScrollBottomLoad"
import { render, shallow } from "enzyme"
import $ from "jquery"

describe('withScrollBottomLoad()', function () {
  const mockProps = {
    activeIcon: "search",
    stickerMode: false,
    load: () => {},
    query: null
  }

  it("renders passed component", function () {
    const comp = () => (<h1>456</h1>),
          hoc = withScrollBottomLoad(comp),
          wrapper = render(React.createElement(hoc, mockProps))

    expect(wrapper.find("h1").length).toEqual(1)
  })

  it("passes props through", function () {
    const comp = (props) => {
            expect(props).toEqual(mockProps)
            return null
          },
          hoc = withScrollBottomLoad(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  describe('scrolling into zone', function () {
    // NOTE: spec assumes a zone height of 100
    // NOTE: spec assumes 1sc waitForRenderTime

    const configMock = {
            scrollTop: null,
            window: {},
            document: {}
          },
          original$ = [],
          origSetTimeout = window.setTimeout,
          waitForRenderTime = 1000

    function setConfigMock(scrollTop, windowHeight, documentHeight) {
      configMock.scrollTop = scrollTop
      configMock.window.height = windowHeight
      configMock.document.height = documentHeight
    }

    function mockEnv() {
      /**
       * Why mock jquery and not the actual DOM, b/c who knows what tf jquery
       *  considers as scrollTop() or height().  It looks for several properties
       *  as fall backs and it would take a while to get them right.
       */
       original$.push(["scrollTop", $.fn.scrollTop])
       original$.push(["height", $.fn.height])

       $.fn.scrollTop = function (){
         expect(this).toBe(window, "scrollTop() called on non-window obj")
         return configMock.scrollTop
       }

       $.fn.height = function () {
         const el = this
         if (el === document) return configMock.document.height
         else if (el === window) return configMock.window.height
         else throw new Error("unknown cxt, $.height() mock")
       }

       /**
        * jsdom setTimeout is weird
        */

        window.setTimeout = function () {
          // how do i get the node implementtion of setTimeout if
          // window === global !!!
        }
    }

    function resetEnv() {
      original$.forEach((pair) => {
        const [name, fn] = pair

        $.fn[name] = fn
      }, null)
      window.setTimeout = origSetTimeout
    }

    beforeAll(function () {
      mockEnv()
    });

    afterAll(function () {
      resetEnv()
    })

    xit("loads data", function () {
      const comp = () => {
              return null
            },
            hoc = withScrollBottomLoad(comp),
            load = spyOn(hoc.prototype, "load"),
            wrapper = shallow(React.createElement(hoc, mockProps))

      setConfigMock(50, 500, 1000) // 50 + 500 > 1000 - 100 => false
      wrapper.simulate("scroll")
      expect(load).not.toHaveBeenCalled()
      setConfigMock(401, 500, 1000) // 401 + 500 > 1000 - 100 => true
      wrapper.simulate("scroll")
      expect(load).toHaveBeenCalled()
    })

    xit("and load() waits for new data to render before enabling load()", function (done) {
      let loadCb
      const hoc = withScrollBottomLoad(() => null),
            fakeLoad = function () {
              loadCb = arguments[arguments.length -1]
              expect(loadCb).toEqual(jasmine.any(Function))
            },
            passedProps = Object.assign({}, mockProps, {load: fakeLoad}),
            load = spyOn(hoc.prototype, "load").and.callThrough(),
            wrapper = shallow(React.createElement(hoc, passedProps))

      setConfigMock(401, 500, 1000) // 401 + 500 > 1000 - 100 => true
      wrapper.simulate("scroll")
      expect(load.calls.count()).toEqual(1)
      setConfigMock(1000, 500, 1000) // still in zone
      wrapper.simulate("scroll")
      expect(load.calls.count()).toEqual(1)
      setConfigMock(10, 500, 1000) // step out of zone
      wrapper.simulate("scroll")
      expect(load.calls.count()).toEqual(1)
      setConfigMock(1000, 1000, 1000) // step back in zone
      wrapper.simulate("scroll")
      expect(load.calls.count()).toEqual(1)
      loadCb()
      expect(window).toBe(global);done()
      global.setTimeout(function () {
        setConfigMock(1000, 1000, 1000) // step back in zone
        wrapper.simulate("scroll")
        expect(load.calls.count()).toEqual(2)
        // step out
        // sep back in
        // calls should be === 2
        done()
      }, waitForRenderTime + 100)
    })
  });
});


//
// setConfigMock(1000, 1000, 1000)
// wrapper.simulate("scroll")
// expect(load.calls.count()).toEqual(2)
