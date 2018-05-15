

import React from "react"
import withScrollBottomLoad from "./withScrollBottomLoad"
import { render } from "enzyme"

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
});


//
// setConfigMock(1000, 1000, 1000)
// wrapper.simulate("scroll")
// expect(load.calls.count()).toEqual(2)
