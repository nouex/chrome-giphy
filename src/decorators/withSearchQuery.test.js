'use strict';

import React from "react"
import withSearchQuery from "./withSearchQuery"
import { render, mount } from "enzyme"

describe('withSearchQuery()', function () {
  const mockProps = {
    foo: "bar",
    load: () => {}
  }

  it("renders passed component", function () {
    const comp = () => (<h1>123</h1>),
          hoc = withSearchQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))

    expect(wrapper.find("h1").length).toEqual(1)
  })

  it("passes unkown props through", function () {
    const comp = (props) => {
            expect(props).toEqual(jasmine.objectContaining({foo: "bar"}))
            return null
          },
          hoc = withSearchQuery(comp),
          wrapper = render(React.createElement(
            hoc, Object.assign({}, mockProps, {foo: "bar"}))
          )
  })

  it("passes load() as prop", function () {
    const comp = (props) => {
            expect(props.load).not.toBe(jasmine.any(Function))
            return null
          },
          hoc = withSearchQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  it("passes searchQuery as prop", function () {
    const comp = (props) => {
            expect(props.searchQuery).not.toBe(undefined)
            return null
          },
          hoc = withSearchQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  it("passes onQueryChange as prop", function () {
    const comp = (props) => {
            expect(props.onQueryChange).toEqual(jasmine.any(Function))
            return null
          },
          hoc = withSearchQuery(comp),
          wrapper = render(React.createElement(hoc, mockProps))
  })

  xit("onQueryChange() updates query", function (done) {
    // IDEA: to fix this use wrapper.prop("onQueryChange")
    const newQueryVal = Symbol(),
          hoc = withSearchQuery(({onQueryChange, query}) => {
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
