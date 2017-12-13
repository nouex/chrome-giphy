'use strict';

import React from "react"
import withStickerMode from "./withStickerMode"
import { shallow, mount } from "enzyme"

describe('withStickerMode()', function () {
  const noop = () => {}

  it('renders wrapped component', function () {
    const props = {
      stickerMode: false,
      load: noop
    }
    const StickerToggleWrapper = withStickerMode(() => (<span foo="123"></span>))
    const wrapper = shallow(<StickerToggleWrapper {...props}/>).dive()
    expect(wrapper.find('span[foo="123"]').exists()).toBeTruthy()
  });

  it('provides `stickerMode` to load', function () {
    const props = {
      load: jasmine.createSpy("load()"),
      stickerMode: false
    }
    const StickerToggleWrapper = withStickerMode(({load}) => {
      load(1, 2, 3)
      return null
    })
    const wrapper = mount(<StickerToggleWrapper {...props}/>)
    expect(props.load).toHaveBeenCalledWith(1, 2, false, 3)
  });

  it('does not pass `stickerMode` to child', function () {
    const props = {
      load: noop,
      stickerMode: false
    }
    let childRendered = false
    const StickerToggleWrapper = withStickerMode(({load, stickerMode}) => {
      childRendered = true
      expect(stickerMode).toBe(undefined)
      return null
    })
    const wrapper = mount(<StickerToggleWrapper {...props}/>)
    expect(childRendered).toBe(true)
  });

  // FIXME: see withStickerMode.js and notes below
  // FIXME: 'Warning: setState(...): Cannot update during an existing state...'
  it('masks load when `props.stickerMode` is toggled', function () {
    // NOTE: atm when stickerMode is toggled, i.e. load is masked, load() will
    // trigger a setState() for StickerToggleWrapper so that it may re-render
    // the Wrapped component with the un-masked load.  The reason for this being
    // we need a way to un-mask load() after it has been used once (like toggle
    // behavior).  We must think of another way to un-mask it without using
    // setState().  Why? B/c un-masking feeds a different (a !== b) props.load()
    // to Wrapped and so it will re-render.  Unless we add a
    // shouldComponentUpdate() to Wrapped.  That's an option, but let's resort
    // to it if we can't find a way without setState() or state at all.
    let loadedOnce = false
    const props = {
      load: jasmine.createSpy("load"),
      stickerMode: false
    }
    const StickerToggleWrapper = withStickerMode(({load}) => {
      if (!loadedOnce) {
        load(foo, 2, 3)
        loadedOnce = true
      }
      return null
    })
    const foo = Symbol("foo")
    const wrapper = mount(<StickerToggleWrapper {...props}/>)
    expect(props.load.calls.count()).toEqual(1)
    expect(props.load).toHaveBeenCalledWith(foo, 2, jasmine.any(Boolean), 3)
    props.load.calls.reset()
    loadedOnce = false
    wrapper.setProps(Object.assign({}, props, {stickerMode: !props.stickerMode}))
    expect(props.load.calls.count()).toEqual(1)
    expect(props.load).toHaveBeenCalledWith(true, 2, jasmine.any(Boolean), 3)
  });

  it('does not mask load when `props.stickerMode` is unchanged', function () {
    const props = {
      load: jasmine.createSpy("load"),
      stickerMode: false
    }
    const StickerToggleWrapper = withStickerMode(({load}) => {
      load(foo, 2, 3)
      return null
    })
    const foo = Symbol("foo")
    const wrapper = mount(<StickerToggleWrapper {...props}/>)
    expect(props.load.calls.count()).toEqual(1)
    expect(props.load).toHaveBeenCalledWith(foo, 2, jasmine.any(Boolean), 3)
    props.load.calls.reset()
    wrapper.setProps(Object.assign({}, props))
    expect(props.load.calls.count()).toEqual(1)
    expect(props.load).toHaveBeenCalledWith(foo, 2, jasmine.any(Boolean), 3)  });
});
