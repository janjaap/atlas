import React from 'react';
import { shallow } from 'enzyme';
import MapLegend from './MapLegend';

describe('MapLegend', () => {
  const props = {
    zoomLevel: 2,
    overlays: [
      {
        id: 2,
        isVisible: false
      },
      {
        id: 3,
        isVisible: true
      }
    ],
    user: {
      authenticated: true,
      scopes: ['authscope1']
    },
    activeMapLayers: [
      {
        title: 'title',
        id: 1,
        maxZoom: 3,
        minZoom: 1,
        authScope: 'authscope1',
        url: 'url',
        layers: ['maplayer1'],
        legendItems: [
          {
            id: 1,
            title: 'legendTitle',
            layer: 'layer',
            iconUrl: 'iconUrl',
            selectable: true
          }
        ]
      },
      {
        title: 'title',
        id: 2,
        maxZoom: 3,
        minZoom: 1,
        authScope: false,
        url: 'url',
        layers: ['maplayer2'],
        legendItems: [
          {
            id: 2,
            title: 'legendTitle',
            layer: false,
            iconUrl: false,
            selectable: true
          },
          {
            id: 3,
            title: 'legendTitle',
            layer: false,
            iconUrl: false,
            selectable: false
          }
        ]
      }
    ]
  };
  it('should render the component', () => {
    const component = shallow(
      <MapLegend
        {...props}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should toggle the layer', () => {
    const onLayerToggleMock = jest.fn();
    const component = shallow(
      <MapLegend
        {...props}
        onLayerToggle={onLayerToggleMock}
      />
    );
    component.find('button').at(0).simulate('click');
    expect(onLayerToggleMock).toHaveBeenCalledWith(1);

    component.find('button').at(1).simulate('click');
    expect(onLayerToggleMock).toHaveBeenCalledWith(2);
  });

  it('should handle the checkbox click', () => {
    const onLayerToggleMock = jest.fn();
    const component = shallow(
      <MapLegend
        {...props}
        onLayerToggle={onLayerToggleMock}
      />
    );

    expect(
      component.instance().determineLegendItemVisibility(props.activeMapLayers[1].legendItems[0])
    ).toBe(false);

    expect(
      component.instance().determineLegendItemVisibility(props.activeMapLayers[1].legendItems[1])
    ).toBe(true);
  });

  it('should handle the checkbox onchange', () => {
    const onLayerVisibilityToggleMock = jest.fn();
    const component = shallow(
      <MapLegend
        {...props}
        onLayerVisibilityToggle={onLayerVisibilityToggleMock}
      />
    );
    component.instance().toggleLayerVisibility(props.activeMapLayers[1]);
    expect(onLayerVisibilityToggleMock).toHaveBeenCalled();
  });
})
;
