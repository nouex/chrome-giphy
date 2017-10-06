'use strict';

import React from "react"
import withPrefetch from "./withPrefetch"
import { render, shallow } from "enzyme"

describe('withPrefetch()', function () {
  const mockProps = {
    activeIcon: "search",
    stickerMode: false,
    load: () => {},
    query: null
  }

  it("renders passed component", function () {
    const comp = () => (<h1>123</h1>),
          hoc = withPrefetch(comp),
          wrapper = render(React.createElement(hoc, mockProps))

    expect(wrapper.find("h1").length).toEqual(1)
  })

  it("passes props through", function () {
    const comp = (props) => {
            expect(props).toEqual(mockProps)
            return null
          },
          hoc = withPrefetch(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  it("calls load() right before mount", function () {
    const comp = () => (<h1>123</h1>),
          hoc = withPrefetch(comp),
          load = jasmine.createSpy("load"),
          passedProps = Object.assign({}, mockProps, {load}),
          wrapper = shallow(React.createElement(hoc, passedProps))

    expect(load).toHaveBeenCalledWith(
      true, // should replace
      mockProps.activeIcon,
      mockProps.stickerMode,
      mockProps.query
    )
  })
});
