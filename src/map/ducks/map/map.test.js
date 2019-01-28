import reducer, {
  MAP_ADD_PANO_OVERLAY,
  MAP_REMOVE_PANO_OVERLAY,
  mapClear,
  mapClearDrawing,
  mapEmptyGeometry,
  mapEndDrawing,
  mapStartDrawing,
  mapUpdateShape,
  setMapBaseLayer,
  toggleMapOverlay,
  toggleMapOverlayVisibility,
  updateBoundingBox,
  updatePan,
  updateZoom,
  mapLoadingAction
} from './map';

describe('Map Reducer', () => {
  const initialState = {
    baseLayer: 'topografie',
    drawingMode: 'none',
    loading: false,
    overlays: [],
    shapeAreaTxt: '',
    shapeDistanceTxt: '',
    shapeMarkers: 0,
    viewCenter: [52.3731081, 4.8932945],
    zoom: 11
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should clear the map state', () => {
    expect(reducer({ shapeMarkers: 2 }, mapClear())).toEqual(initialState);
  });

  it('should clear the map drawing when dispatching mapClearDrawing', () => {
    expect(reducer({ geometry: ['foo'] }, mapClearDrawing())).toEqual({
      geometry: []
    });
  });

  it('should clear the map drawing when dispatching mapEmptyGeometry', () => {
    expect(reducer({ geometry: ['foo'] }, mapEmptyGeometry())).toEqual({
      geometry: []
    });
  });

  it('should set the shape state when dispatching mapUpdateShape', () => {
    const payloadAndResult = {
      shapeMarkers: [1, 2],
      shapeDistanceTxt: 'foo',
      shapeAreaTxt: 'bar'
    };
    expect(reducer({}, mapUpdateShape(payloadAndResult))).toEqual(payloadAndResult);
  });

  it('should set the drawing mode when dispatching mapStartDrawing', () => {
    const payloadAndResult = {
      drawingMode: 1
    };
    expect(reducer({}, mapStartDrawing(payloadAndResult))).toEqual(payloadAndResult);
  });

  it('should set the geometry and drawing mode when dispatching mapEndDrawing', () => {
    expect(reducer(initialState, mapEndDrawing({
      polygon: {
        markers: []
      }
    }))).toEqual({
      ...initialState,
      drawingMode: 'none',
      geometry: undefined
    });

    expect(reducer(initialState, mapEndDrawing({
      polygon: {
        markers: [{}, {}, {}]
      }
    }))).toEqual({
      ...initialState,
      drawingMode: 'none',
      geometry: []
    });

    expect(reducer(initialState, mapEndDrawing({
      polygon: {
        markers: [{}, {}]
      }
    }))).toEqual({
      ...initialState,
      drawingMode: 'none',
      geometry: [{}, {}]
    });
  });

  it('should set the drawing mode when dispatching setMapBaseLayer', () => {
    expect(reducer({}, setMapBaseLayer('baseLayer'))).toEqual({
      baseLayer: 'baseLayer'
    });
  });

  it('should set the viewCenter and zoom state', () => {
    const expectedResult = {
      zoom: 1,
      viewCenter: [
        123, 321
      ]
    };
    expect(reducer({}, updateZoom({
      zoom: 1,
      center: {
        lat: 123,
        lng: 321
      }
    }, true))).toEqual(expectedResult);

    expect(reducer({}, updateZoom({
      zoom: 1,
      center: {
        lat: 123,
        lng: 321
      }
    }, true))).toEqual(expectedResult);
  });

  it('should set the viewCenter when dispatching updatePan', () => {
    const expectedResult = {
      viewCenter: [
        123, 321
      ]
    };
    expect(reducer({}, updatePan({
      center: {
        lat: 123,
        lng: 321
      }
    }, true))).toEqual(expectedResult);
  });

  it('should set the boundingBox state when dispatching updateBoundingBox', () => {
    const expectedResult = {
      boundingBox: [
        123, 321
      ]
    };
    expect(reducer({}, updateBoundingBox(expectedResult, true))).toEqual(expectedResult);
    expect(reducer({}, updateBoundingBox(expectedResult, false))).toEqual(expectedResult);
  });

  it('should set the overlays except the overlay matching the id from payload', () => {
    const state = {
      overlays: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    };

    expect(reducer(state, toggleMapOverlay(3))).toEqual({
      overlays: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 4
        }
      ]
    });

    expect(reducer(state, toggleMapOverlay(10))).toEqual({
      overlays: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 10,
          isVisible: true
        }
      ]
    });
  });

  it('should toggle the overlay visibility', () => {
    const state = {
      overlays: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    };
    expect(reducer(state, toggleMapOverlayVisibility(1, true))).toEqual({
      overlays: [
        {
          id: 1,
          isVisible: true
        },
        {
          id: 2,
          isVisible: undefined
        },
        {
          id: 3,
          isVisible: undefined
        },
        {
          id: 4,
          isVisible: undefined
        }
      ]
    });
  });

  it(`should add a pano overlay when dispatching ${MAP_ADD_PANO_OVERLAY}`, () => {
    expect(reducer({ overlays: [] }, {
      type: MAP_ADD_PANO_OVERLAY,
      payload: {
        id: 'panob',
        history: {
          year: 0,
          layerName: 'pano'
        }
      }
    })).toEqual({
      overlays: [{ id: 'pano', isVisible: true }]
    });

    expect(reducer({ overlays: [{ id: 'panoaaa' }] }, {
      type: MAP_ADD_PANO_OVERLAY,
      payload: {}
    })).toEqual({
      overlays: [{ id: 'pano', isVisible: true }]
    });

    expect(reducer({ map: { overlays: [{ id: 'pano' }] } }, {
      type: MAP_ADD_PANO_OVERLAY,
      payload: {
        id: 'panoaaa'
      }
    })).toEqual({ map: { overlays: [{ id: 'pano' }] } });
  });

  it(`should remove a pano overlay when dispatching ${MAP_REMOVE_PANO_OVERLAY}`, () => {
    expect(reducer({ overlays: [{ id: 'panob' }] }, {
      type: MAP_REMOVE_PANO_OVERLAY,
      payload: {
        id: 'panoa'
      }
    })).toEqual({
      overlays: []
    });

    expect(reducer({ overlays: [{ id: 'notpano' }] }, {
      type: MAP_REMOVE_PANO_OVERLAY,
      payload: {
        id: 'panoa'
      }
    })).toEqual({
      overlays: [{ id: 'notpano' }]
    });
  });

  it('should set the loading flag when dispatching the mapLoadingAction', () => {
    expect(reducer({ }, mapLoadingAction(true))).toEqual({
      loading: true
    });
  });
});
