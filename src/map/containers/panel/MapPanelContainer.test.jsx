import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapPanelContainer from './MapPanelContainer';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';

describe('MapPanelContainer', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureMockStore()({
      map: {
        baseLayer: '',
        overlays: []
      },
      mapLayers: [],
      overlays: [{}],
      ui: { isMapPanelHandleVisible: true }
    });
    wrapper = shallow(<MapPanelContainer />, { context: { store } }).dive();
  });

  it('should render MapType and MapLayers', () => {
    expect(wrapper.find(MapType).length).toBe(1);
    expect(wrapper.find(MapLayers).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render MapLegend if store contains active map layers', () => {
    expect(wrapper.find(MapLegend).length).toBe(0);
    wrapper.setProps({ activeMapLayers: [{}] });
    expect(wrapper.find(MapLegend).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
