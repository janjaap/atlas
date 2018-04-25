import reducer, {
  FETCH_MAP_LAYERS_REQUEST,
  FETCH_MAP_LAYERS_SUCCESS,
  FETCH_MAP_LAYERS_FAILURE
} from './map-layers';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MAP_LAYERS_REQUEST', () => {
    const startAction = {
      type: FETCH_MAP_LAYERS_REQUEST
    };
    expect(reducer({}, startAction)).toEqual({
      error: null,
      isLoading: true
    });
  });

  it('should handle FETCH_MAP_LAYERS_SUCCESS', () => {
    const successAction = {
      type: FETCH_MAP_LAYERS_SUCCESS,
      mapLayers: [{ id: 1 }]
    };
    expect(reducer({}, successAction)).toEqual({
      isLoading: false,
      items: [...successAction.mapLayers]
    });
  });

  it('should handle FETCH_MAP_LAYERS_FAILURE', () => {
    const updateAction = {
      type: FETCH_MAP_LAYERS_FAILURE,
      error: 'Error'
    };
    expect(reducer({}, updateAction)).toEqual({
      error: 'Error',
      isLoading: false
    });
  });
});
