'use strict';

import React from "react"
import withPrefetch from "./withPrefetch"
import { render, mount } from "enzyme"
import configureStore from 'redux-mock-store'
import { renderIntoDocument } from 'react-dom/test-utils'; // ES6

describe('withPrefetch()', function () {
  let dummyProps
  beforeAll(function () {
    dummyProps = {
      load: () => {},
    }
  })

 // NOTE: tried using render(), doesn't support exists()
  it("renders wrapped component", function () {
    let mockStore = configureStore([]),
        dummyStore = mockStore({
          activeIcon: "search",
          currents: {
            search: [{}]
          }
        })
    dummyProps.store = dummyStore

    const comp = () => (<h6></h6>),
          hoc = withPrefetch(comp),
          wrapper = mount(React.createElement(hoc, dummyProps))

    expect(wrapper.find(comp).exists()).toBeTruthy()
  })

  it("passes props through", function () {
    let mockStore = configureStore([]),
        dummyStore = mockStore({
          activeIcon: "search",
          currents: {
            search: [{}]
          }
        })
    dummyProps.store = dummyStore

    const dummyPropsCpy = Object.assign({}, dummyProps)
    delete dummyPropsCpy.store
    const comp = (props) => {
            expect(props).toEqual(dummyPropsCpy)
            return null
          },
          hoc = withPrefetch(comp),
          wrapper = render(React.createElement(hoc, dummyProps))
  })

  // TODO: verify load() happens **before** mounting
  it("calls load() before mounting", function () {
    let mockStore = configureStore([]),
        dummyStore = mockStore({
          activeIcon: "search",
          currents: {
            search: []    // NOTE: empty means set needsPrefetch => true
          }
        })
    dummyProps.store = dummyStore

    const hoc = withPrefetch(() => null),
          load = jasmine.createSpy("load"),
          passedProps = Object.assign({}, dummyProps, {load}),
          wrapper = renderIntoDocument(React.createElement(hoc, passedProps))

    expect(load).toHaveBeenCalledWith(
      jasmine.any(Boolean), // should replace
      dummyProps.activeIcon,
      dummyProps.query)
  })
});
