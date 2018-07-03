import { endpointTypes } from '../map/services/map-detail';

export const FETCH_DETAIL = 'FETCH_DETAIL';

/* eslint-disable */
// export default function detailReducer(state = {}, action) {
/* istanbul ignore next */
window.reducers = window.reducers || {};
window.reducers.detailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL:

      // If preview panel is available use that, otherwise show detail page aside.
      const leaveMapFullscreen = action.payload && Object
        .keys(endpointTypes)
        .some((typeKey) => action.payload.includes(endpointTypes[typeKey]));

      return {
        ...state,
        dataSelection: null,
        detail: {
          endpoint: action.payload,
          reload: Boolean(state.detail && state.detail.endpoint === action.payload),
          isLoading: true,
          isFullscreen: action.payload && action.payload.includes('dcatd/datasets'),
          skippedSearchResults: Boolean(action.skippedSearchResults)
        },
        map: {
          ...state.map,
          isLoading: true
        },
        page: {
          ...state.page,
          name: null,
          type: null
        },
        search: null,
        straatbeeld: null,
        ui: {
          ...state.ui,
          isMapFullscreen: leaveMapFullscreen ? state.ui.isMapFullscreen : false,
        }
      };

    case 'SHOW_DETAIL':
      return {
        ...state,
        detail: {
          ...state.detail,
          display: action.payload.display,
          geometry: action.payload.geometry,
          isLoading: false,
          reload: false
        },
        map: {
          ...state.map,
          isLoading: false
        }
      };

    case 'DETAIL_FULLSCREEN':
      return {
        ...state,
        detail: {
          ...state.detail,
          isFullscreen: action.payload
        }
      };

    default:
      return state;
  }
};

export const detailReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_DETAIL:

      // If preview panel is available use that, otherwise show detail page aside.
      const leaveMapFullscreen = action.payload && Object
        .keys(endpointTypes)
        .some((typeKey) => action.payload.includes(endpointTypes[typeKey]));

      return {
        ...state,
        endpoint: action.payload,
        reload: Boolean(state && state.endpoint === action.payload),
        isLoading: true,
        isFullscreen: action.payload && action.payload.includes('dcatd/datasets'),
        skippedSearchResults: Boolean(action.skippedSearchResults)
      };

    case 'SHOW_DETAIL':
      return {
          ...state,
          display: action.payload.display,
          geometry: action.payload.geometry,
          isLoading: false,
          reload: false
      };

    case 'DETAIL_FULLSCREEN':
      return {
        ...state,
        isFullscreen: action.payload
      };

    default:
      return state;
  }
};

export const fetchDetail = (endpoint) => ({
  type: FETCH_DETAIL,
  payload: endpoint
});
