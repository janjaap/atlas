import reducer from './reducer';
import {
  getDetail,
  getDetailGeometry,
  getDetailDisplay,
  isDetailLoading
} from './selectors';
import { FETCH_DETAIL, SHOW_DETAIL } from './constants';
import { fetchDetail } from './actions';

describe('DetailReducer', () => {
  const initialState = {};
  const stateAfterRequest = {
    some: 'data'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false
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

describe('Detail Selectors', () => {
  const initialState = reducer(undefined, {});

  it('should return detail information from the state', () => {
    expect(getDetail({ detail: initialState })).toEqual(initialState);
    expect(getDetailGeometry({ detail: initialState })).toEqual(initialState.geometry);
    expect(getDetailDisplay({ detail: initialState })).toEqual(initialState.display);
    expect(isDetailLoading({ detail: initialState })).toEqual(initialState.isLoading);
  });
});
