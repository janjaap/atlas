import reducer, {
  DETAIL_VIEW,
  FETCH_DETAIL,
  fetchDetail,
  SHOW_DETAIL
} from './detail';

describe('DetailReducer', () => {
  const initialState = {};
  const stateAfterRequest = {
    some: 'data'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false,
      view: DETAIL_VIEW.MAP_DETAIL
    });
  });

  it(`should set the location when ${FETCH_DETAIL} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_DETAIL,
      payload: 'payload'
    })).toEqual({
      isLoading: true
    });
  });

  it(`should set the detail data when ${SHOW_DETAIL} is dispatched`, () => {
    expect(reducer(stateAfterRequest, {
      type: SHOW_DETAIL,
      payload: {
        display: 'display',
        geometry: 'geometry'
      }
    })).toEqual({
      some: 'data',
      display: 'display',
      geometry: 'geometry',
      isLoading: false
    });
  });
});

describe('Detail Actions', () => {
  describe('fetchDetail method', () => {
    it('should return an object with action type and payload containing an endpoint', () => {
      expect(fetchDetail('endpoint')).toEqual({
        type: FETCH_DETAIL,
        payload: 'endpoint'
      });
    });
  });
});