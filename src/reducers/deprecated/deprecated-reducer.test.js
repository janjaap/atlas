import reducer from './deprecated-reducer';
import * as environment from '../../shared/environment';
import * as homeReducer from '../home-reducers';
import * as DetailsReducer from '../details';
import * as DataSelectionReducer from '../data-selection-reducers';
import * as MapPreviewPanelReducer from '../../map/ducks/preview-panel/map-preview-panel';
import * as PageReducer from '../page-reducers';
import * as filtersReducers from './filters-reducers';
import * as straatbeeldReducers from './straatbeeld-reducers';
import * as MapSearchResultsReducer from '../../map/ducks/search-results/map-search-results';
import * as MapClickLocationReducer from '../../map/ducks/click-location/map-click-location';
import * as searchReducers from './search-reducers';
import * as deepFreeze from '../../shared/services/freeze/freeze';

describe('The deprecated reducer', () => {
  beforeEach(() => {
    deepFreeze.default = jest.fn((value) => value); // identity function
    environment.isDevelopment = () => false;
  });

  it('groups all separate reducers and calls the appropriate one depending on the action type', () => {
    const state = { foo: 'bar' };

    const actionC = jest.fn();
    const actionF = jest.fn();
    const actionG = jest.fn();
    const actionH = jest.fn();
    const actionI = jest.fn();
    const actionL = jest.fn();

    DataSelectionReducer.default = { ACTION_I: actionI };
    DetailsReducer.default = {};
    filtersReducers.default = { ACTION_L: actionL };
    homeReducer.default = { ACTION_C: actionC };
    PageReducer.default = { ACTION_F: actionF };
    searchReducers.default = { ACTION_G: actionG };
    straatbeeldReducers.default = { ACTION_H: actionH };

    reducer(state, { type: { id: 'ACTION_C' } });
    reducer(state, { type: { id: 'ACTION_F' } });
    reducer(state, { type: { id: 'ACTION_G' } });
    reducer(state, { type: { id: 'ACTION_H' } });
    reducer(state, { type: { id: 'ACTION_I' } });
    reducer(state, { type: { id: 'ACTION_L' } });

    expect(actionC.mock.calls[0])
      .toEqual([state, undefined]);
    expect(actionF.mock.calls[0])
      .toEqual([state, undefined]);
    expect(actionG.mock.calls[0])
      .toEqual([state, undefined]);
    expect(actionH.mock.calls[0])
      .toEqual([state, undefined]);
    expect(actionI.mock.calls[0])
      .toEqual([state, undefined]);
    expect(actionL.mock.calls[0])
      .toEqual([state, undefined]);
  });

  it('calls DetailsReducer', () => {
    const payload = { abc: 'xyz' };
    const state = { foo: 'bar' };

    DetailsReducer.default = jest.fn();
    reducer(state, { type: { id: 'FETCH_DETAIL' }, payload });

    expect(DetailsReducer.default.mock.calls[0])
      .toEqual([state, { payload, type: 'FETCH_DETAIL' }]);
  });

  it('calls MapSearchResultsReducer', () => {
    const state = { foo: 'bar' };

    MapSearchResultsReducer.default = jest.fn();
    reducer(state, { type: { id: 'FETCH_MAP_SEARCH_RESULTS_FAILURE' } });

    expect(MapSearchResultsReducer.default.mock.calls[0])
      .toEqual([state, undefined]);
  });

  it('calls MapClickLocationReducer', () => {
    const state = { foo: 'bar' };

    MapClickLocationReducer.default = jest.fn();
    reducer(state, { type: { id: 'SET_MAP_CLICK_LOCATION' } });

    expect(MapClickLocationReducer.default.mock.calls[0])
      .toEqual([state, undefined]);
  });

  it('calls MapPreviewPanelReducer', () => {
    const state = { foo: 'bar' };

    MapPreviewPanelReducer.default = jest.fn();
    reducer(state, { type: { id: 'OPEN_MAP_PREVIEW_PANEL' } });

    expect(MapPreviewPanelReducer.default.mock.calls[0])
      .toEqual([state, undefined]);
  });


  it('returns the oldState if the specified action type has no separate reducer', () => {
    const state = { foo: 'bar' };
    // Note redux has some built-in action types that we can safely ignore.
    const output = reducer(state, { type: { id: 'ACTION_NO_REDUCER' } });

    expect(output)
      .toBe(state);
  });

  it('deep freezes legacy state in development', () => {
    const state = { foo: 'bar' };
    DataSelectionReducer.default = { FREEZE: (s) => s };

    environment.isDevelopment = () => true;
    reducer(state, { type: { id: 'FREEZE' } });

    expect(deepFreeze.default).toHaveBeenCalledWith(state);
  });

  it('should call reducer for Vanilla action types', () => {
    const state = { foo: 'bar' };
    const payload = { abc: 'xyz' };
    DetailsReducer.default = jest.fn();
    const action = { type: 'FETCH_DETAIL', payload };
    reducer(state, action);

    expect(DetailsReducer.default.mock.calls[0])
      .toEqual([state, action]);
  });

  it('deep freezes vanilla state in development', () => {
    const state = { foo: 'bar' };
    const payload = { abc: 'xyz' };
    DetailsReducer.default = () => state;
    environment.isDevelopment = () => true;
    const action = { type: 'FETCH_DETAIL', payload };

    reducer(state, action);

    expect(deepFreeze.default).toHaveBeenCalledWith(state);
  });
});
