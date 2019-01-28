import reducer, {
  FETCH_PANEL_ITEMS_REQUEST,
  FETCH_PANEL_ITEMS_SUCCESS,
  FETCH_PANEL_ITEMS_FAILURE,
  fetchPanelLayers,
  getMapPanelLayers,
  selectActivePanelLayers,
  getActiveMapLayersWithinZoom,
  selectNotClickableVisibleMapLayers
} from './map-panel-layers';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PANEL_LAYERS_REQUEST', () => {
    const startAction = {
      type: FETCH_PANEL_ITEMS_REQUEST
    };
    expect(reducer({}, startAction)).toEqual({
      error: null,
      isLoading: true
    });
  });

  it('should handle FETCH_PANEL_ITEMS_SUCCESS', () => {
    const successAction = {
      type: FETCH_PANEL_ITEMS_SUCCESS,
      panelLayers: [{ id: 1 }]
    };
    expect(reducer({}, successAction)).toEqual({
      isLoading: false,
      items: [...successAction.panelLayers]
    });
  });

  it('should handle FETCH_PANEL_ITEMS_FAILURE', () => {
    const updateAction = {
      type: FETCH_PANEL_ITEMS_FAILURE,
      error: 'Error'
    };
    expect(reducer({}, updateAction)).toEqual({
      error: 'Error',
      isLoading: false
    });
  });
});

// SELECTORS
describe('selectors', () => {
  const panelLayers = [
    {
      category: 'Geografie: onroerende zaken',
      maxZoom: 16,
      minZoom: 8,
      legendItems: [
        { id: 'bgem', notClickable: true }
      ],
      notClickable: true,
      title: 'Kadastrale perceelsgrenzen',
      url: '/maps/brk?version=1.3.0&service=WMS'
    },
    {
      category: 'Verkeer en infrastructuur',
      id: 'pv',
      notClickable: true,
      layers: ['alle_parkeervakken'],
      legendItems: [
        {
          selectable: false,
          title: 'FISCAAL'
        }
      ],
      maxZoom: 16,
      minZoom: 10,
      title: 'Parkeervakken - Fiscale indeling',
      url: '/maps/parkeervakken?version=1.3.0&service=WMS'
    }
  ];

  const overlays = [{
    id: 'bgem',
    isVisible: true
  }];

  describe('getMapPanelLayers', () => {
    it('should return an undefined if there are no panelLayers', () => {
      const selected = getMapPanelLayers.resultFunc([]);
      expect(selected).toEqual([]);
    });

    it('should return an array with all panelLayers', () => {
      const selected = getMapPanelLayers.resultFunc({ items: panelLayers });
      expect(selected).toEqual(panelLayers);
    });
  });

  describe('selectActivePanelLayers', () => {
    it('should return an empty array if there are no panelLayers', () => {
      const selected = selectActivePanelLayers.resultFunc([], overlays);
      expect(selected).toEqual([]);
    });

    it('should return an empty array if there are no active overlays', () => {
      const selected = selectActivePanelLayers.resultFunc(panelLayers, []);
      expect(selected).toEqual([]);
    });

    it('should return an array with all panelLayers matching the id of the active overlays', () => {
      const selected = selectActivePanelLayers.resultFunc(panelLayers, overlays);
      expect(selected).toEqual([
        panelLayers[0]
      ]);
    });

    it('should return an all active panelLayers and sort them', () => {
      const selected = selectActivePanelLayers.resultFunc(panelLayers, [...overlays, { id: 'pv' }]);
      expect(selected).toEqual([
        panelLayers[1],
        panelLayers[0]
      ]);
    });
  });

  describe('getActiveMapLayersWithinZoom', () => {
    it('should filter out mapLayers based on the zoom', () => {
      const selected = getActiveMapLayersWithinZoom.resultFunc(9, panelLayers);
      expect(selected).toEqual([
        panelLayers[0]
      ]);
    });

    it('should filter out mapLayers if the current zoom of the map is bigger then the maxZoom of the layer', () => {
      const selected = getActiveMapLayersWithinZoom.resultFunc(20, panelLayers);
      expect(selected).toEqual([]);
    });

    it('should filter out mapLayers if the current zoom of the map is smaller then the minZoom of the layer', () => {
      const selected = getActiveMapLayersWithinZoom.resultFunc(6, panelLayers);
      expect(selected).toEqual([]);
    });
  });

  describe('selectNotClickableVisibleMapLayers', () => {
    it('should return an array of the notClickable layers', () => {
      const selected = selectNotClickableVisibleMapLayers.resultFunc(panelLayers, overlays);
      expect(selected).toEqual([
        {
          id: 'bgem',
          notClickable: true
        }
      ]);
    });
  });
});

// ACTION CREATORS
describe('actions', () => {
  describe('fetchPanelLayers', () => {
    it('should create an action to request the panel layers', () => {
      const expectedAction = {
        type: FETCH_PANEL_ITEMS_REQUEST,
        panelLayers: []
      };
      expect(fetchPanelLayers(expectedAction.panelLayers)).toEqual(expectedAction);
    });
  });
});
