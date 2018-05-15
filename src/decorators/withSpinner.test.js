

import React from "react"
import withSpinner from "./withSpinner"
import { render, mount, shallow } from "enzyme"
import Spinner from "../components/Spinner"

describe('withSpinner()', function () {
  const mockProps = {
    load: () => {}
  }

  xit("renders passed component", function () {
    const comp = () => (<h1>123</h1>),
          hoc = withSpinner(comp),
          wrapper = render(React.createElement(hoc, mockProps))

    expect(wrapper.find("h1").length).toEqual(1)
  })

  it("passes down unnknown props", function () {
    const passedProps = {
            foo: "bar",
            baz: "baaz"
          },
          comp = (props) => {
            expect(props).toEqual(jasmine.objectContaining(passedProps))
            return null
          },
          hoc = withSpinner(comp),
          wrapper = render(React.createElement(hoc, Object.assign({}, mockProps, passedProps)))
  })

  it("passes monkey-patched load()", function () {
    const comp = (props) => null,
          hoc = withSpinner(comp),
          wrapper = mount(React.createElement(hoc, mockProps)),
          childWrapper = wrapper.childAt(0),
          passedLoad = childWrapper.prop("load")
          expect(passedLoad).not.toBe(mockProps.load)
          expect(passedLoad).toEqual(jasmine.any(Function))
  })

  xit("cb passed to instance's load() is passed to real load()", function () {
    /**
     * b/c the cb ge'ts wrapped we cant' assert it's presence b/c we can't
     *  access it. instead assert by invokation
     */
    const comp = () => null,
          hoc = withSpinner(comp),
          spyLoad = jasmine.createSpy("load"),
          wrapper = mount(React.createElement(hoc, {load: spyLoad})),
          instance = wrapper.instance(),
          load = instance.load.bind(instance),
          loadArgs = [true, "foo", "bar"],
          ourCb = jasmine.createSpy("ourCb")

          load.apply(null, loadArgs.concat(ourCb))
          expect(spyLoad.calls.count()).toEqual(1)
          expect(spyLoad.calls.argsFor(0)).toEqual(loadArgs.concat(jasmine.any(Function)))

          let theirCb = spyLoad.calls.argsFor(0)[loadArgs.length]
          expect(ourCb).not.toHaveBeenCalled()
          theirCb()
          expect(ourCb.calls.count()).toEqual(1)

  })

  it('renders <Spinner /> when state.isLoadingMore === true', function () {
    let   hoc = withSpinner(() => null),
          wrapper = shallow(React.createElement(hoc, mockProps))

    expect(wrapper.find(Spinner).exists()).toBe(false) // initial isLoadingMore => false
    wrapper = wrapper.setState({isLoadingMore: true})
    expect(wrapper.find(Spinner).exists()).toBe(true)
    wrapper = wrapper.setState({isLoadingMore: false})
    expect(wrapper.find(Spinner).exists()).toBe(false)
  });

  // NOTE: this relies on setState(), remember it's not always sync so could
  // be flaky test
  it('load(true) does not display spinner', function () {
    const hoc = withSpinner(() => null),
          wrapper = shallow(React.createElement(hoc, mockProps)),
          instance = wrapper.instance(),
          load = instance.load.bind(instance)

    expect(wrapper.state("isLoadingMore")).toBe(false)
    load(true)
    expect(wrapper.state("isLoadingMore")).toBe(true)
  });


  it('load(false) displays spinner', function () {
    const hoc = withSpinner(() => null),
          wrapper = shallow(React.createElement(hoc, mockProps)),
          instance = wrapper.instance(),
          load = instance.load.bind(instance)

    expect(wrapper.state("isLoadingMore")).toBe(false)
    load(false)
    // QUESTION: does enzyme make sure setState() is sync ?? Otherwise
    //  this could be a flaky test
    expect(wrapper.state("isLoadingMore")).toBe(true)
  });
});
