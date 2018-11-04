import React from 'react';
import L from 'leaflet';
import { shallow } from 'enzyme';
import MapBusyIndicator, { DATA_LOADING_EVENT, DATA_LOADED_EVENT } from './MapBusyIndicator';

jest.mock('leaflet');
jest.mock('react-leaflet');

describe('MapBusyIndicator', () => {
  let wrapper;
  let wrapperInstance;
  const map = {
    on: jest.fn(),
    off: jest.fn(),
    fire: jest.fn()
  };


  beforeAll(() => {
    L.Control.extend.mockImplementation(() => jest.fn());
    L.DomUtil.create.mockImplementation(() => ({}));
  });

  beforeEach(() => {
    wrapper = shallow(
      <MapBusyIndicator
        loading={false}
      />, {
        context: {
          map
        }
      }
    );
    wrapperInstance = wrapper.instance();
  });

  it('should render an empty component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should add the control to the leaflet instance', () => {
    wrapperInstance.createLeafletElement();
    expect(L.Control.extend).toHaveBeenCalled();
  });

  it('should never update', () => {
    expect(wrapperInstance.shouldComponentUpdate()).toBe(false);
  });

  it('should show the indicator when the loading prop is set', () => {
    wrapperInstance.componentWillReceiveProps({ loading: true });
    expect(map.fire).toHaveBeenCalledWith(DATA_LOADING_EVENT);
  });

  it('should do nothing when the loading prop is not changed', () => {
    map.fire.mockClear();
    expect(map.fire).not.toHaveBeenCalled();
    wrapper.setProps({ loading: false });
    wrapperInstance.componentWillReceiveProps({ loading: false });
    expect(map.fire).not.toHaveBeenCalled();
  });

  it('should hide the indicator when the loading prop is set', () => {
    wrapper.setProps({ loading: true });
    wrapperInstance.componentWillReceiveProps({ loading: false });
    expect(map.fire).toHaveBeenCalledWith(DATA_LOADED_EVENT);
  });

  describe('mapControlExtension', () => {
    let mapControlExtension;
    beforeEach(() => {
      mapControlExtension = wrapperInstance.createMapContolExtension();
      L.DomUtil.addClass.mockClear();
      L.DomUtil.removeClass.mockClear();
    });

    it('should create mapControlExtension', () => {
      expect(mapControlExtension).toBeDefined();
    });

    it('should inititalize the control', () => {
      const options = { foo: 'bar' };
      mapControlExtension.initialize(options);
      expect(L.setOptions).toHaveBeenLastCalledWith(mapControlExtension, options);
      expect(mapControlExtension.state).toEqual({ pendingCalls: 0 });
    });

    it('should hook the loading events and add the control to the map', () => {
      mapControlExtension.onAdd(map);
      expect(map.on).toHaveBeenCalled();
    });

    it('should remove the events when the map is unloaded', () => {
      mapControlExtension.onRemove(map);

      expect(map.off).toHaveBeenCalled();
    });

    it('should handleLoading when no call is pending', () => {
      mapControlExtension.state = { pendingCalls: 0 };
      mapControlExtension.handleLoading();
      expect(L.DomUtil.addClass).toHaveBeenCalled();
      expect(mapControlExtension.state).toEqual({ pendingCalls: 1 });
    });

    it('should handleLoading when calls are pending', () => {
      mapControlExtension.state = { pendingCalls: 2 };
      mapControlExtension.handleLoading();
      expect(L.DomUtil.addClass).not.toHaveBeenCalled();
      expect(L.DomUtil.removeClass).not.toHaveBeenCalled();
      expect(mapControlExtension.state).toEqual({ pendingCalls: 3 });
    });

    it('should handleLoaded when one call is pending', () => {
      mapControlExtension.state = { pendingCalls: 1 };
      mapControlExtension.handleLoaded();
      expect(L.DomUtil.removeClass).toHaveBeenCalled();
      expect(mapControlExtension.state).toEqual({ pendingCalls: 0 });
    });

    it('should handleLoaded when more then one call is pending', () => {
      mapControlExtension.state = { pendingCalls: 3 };
      mapControlExtension.handleLoaded();
      expect(L.DomUtil.removeClass).not.toHaveBeenCalled();
      expect(mapControlExtension.state).toEqual({ pendingCalls: 2 });
    });
  });
});
