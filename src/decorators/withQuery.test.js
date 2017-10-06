'use strict';

import React from "react"
import withQuery from "./withQuery"
import { render, mount } from "enzyme"

describe('withQuery()', function () {
  const mockProps = {
    foo: "bar"
  }

  it("renders passed component", function () {
    const comp = () => (<h1>123</h1>),
          hoc = withQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))

    expect(wrapper.find("h1").length).toEqual(1)
  })

  it("passes props through", function () {
    const comp = (props) => {
            expect(props).toEqual(jasmine.objectContaining(mockProps))
            return null
          },
          hoc = withQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  it("passes query as prop", function () {
    const comp = (props) => {
            expect(props.query).not.toBe(undefined)
            return null
          },
          hoc = withQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  it("passes onQueryChange as prop", function () {
    const comp = (props) => {
            expect(props.onQueryChange).toEqual(jasmine.any(Function))
            return null
          },
          hoc = withQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  xit("onQueryChange() updates query", function (done) {
    // IDEA: to fix this use wrapper.prop("onQueryChange")
    const newQueryVal = Symbol(),
          hoc = withQuery(({onQueryChange, query}) => {
            expect(query).toBe(null)
            onQueryChange(newQueryVal)
          })

    // monkey patch setState()
    const _setState = hoc.prototype.setState

    hoc.prototype.setState = function (obj) {
      expect(obj.query).toBe(newQueryVal)
      done()
      // _setState.apply(this, [].slice.call(arguments).concat(done))
    }

    mount(React.createElement(hoc))
  })
});
