'use strict';

import React from "react"
import { shallow } from "enzyme"
import Icon from "./Icon"

describe('<Icon />', function () {
  it('passes props.onClick to children untouched', function () {
    const spy = jasmine.createSpy("onClick")
    const childWrapper = shallow(<Icon onClick={spy} icon="span"/>).find("div")
    expect(childWrapper.prop("onClick")).toBe(spy)
    expect(spy).not.toHaveBeenCalled()
    // simulate click
    childWrapper.get(0).props.onClick()
    expect(spy).toHaveBeenCalled()
  });
});
