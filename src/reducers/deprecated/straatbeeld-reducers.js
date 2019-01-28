import ACTIONS from '../../shared/actions';
import STRAATBEELD_CONFIG from '../../../modules/straatbeeld/straatbeeld-config';
import isObject from '../../shared/services/is-object';

function getHeadingDegrees([x1, y1], [x2, y2]) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

function resetStraatbeeld() {
  return {
    id: null,
    location: null,
    isInitial: true,
    date: null,
    hotspots: [],
    heading: null,
    pitch: null,
    fov: null,
    image: null,
    isLoading: true
  };
}

/**
 * @description If the oldState had an active straatbeeld it will remember the heading.
 *
 * @param {Object} state
 * @param {Object} payload - {id: 'abc123', heading: 90}
 *
 * @returns {Object} newState
 */
function fetchStraatbeeldByIdReducer(state, payload) {
  return {
    ...state,
    straatbeeld: {
      ...(state.straatbeeld || {}),
      ...resetStraatbeeld(),
      id: payload.id,
      heading: payload.heading ||
        (state.straatbeeld && state.straatbeeld.heading) ||
        null,
      location: (state.straatbeeld && state.straatbeeld.location) || null,
      isInitial: payload.isInitial,
      isFullscreen: typeof payload.isFullscreen !== 'undefined' ? payload.isFullscreen
        : state.straatbeeld && state.straatbeeld.isFullscreen ? state.straatbeeld.isFullscreen
          : undefined
    },
    map: isObject(state.map) ? {
      ...state.map,
      isLoading: true
    } : state.map,
    search: null,
    dataSelection: null
  };
}

/**
 * @param {Object} oldState
 * @param {Array} payload - A location, e.g. [52.123, 4.789]
 *
 * @returns {Object} newState
 */
function fetchStraatbeeldByLocationReducer(state, payload) {
  const map = isObject(state.map) ? { ...state.map } : state.map;

  if (state.ui && (state.ui.isMapPanelVisible || state.ui.isMapFullscreen)) {
    map.viewCenter = payload;
  }

  const coordinates = [
    Number(payload[0].toFixed(6)),
    Number(payload[1].toFixed(6))
  ];

  return {
    ...state,
    straatbeeld: {
      ...(state.straatbeeld || {}),
      ...resetStraatbeeld(),
      location: coordinates,
      targetLocation: coordinates
    },
    map: {
      ...map,
      geometry: []
    },
    ui: isObject(state.ui) ? {
      ...state.ui,
      isMapPanelVisible: false,
      isMapFullscreen: false
    } : state.ui,
    page: isObject(state.page) ? {
      ...state.page,
      name: null
    } : state.page,
    search: null,
    dataSelection: null,
    detail: null
  };
}

function straatbeeldFullscreenReducer(state, payload) {
  return {
    ...state,
    straatbeeld: isObject(state.straatbeeld) ? {
      ...state.straatbeeld,
      isFullscreen: typeof payload !== 'undefined' ? payload : state.straatbeeld.isFullscreen
    } : state.straatbeeld
  };
}

/**
 * @param {Object} state
 * @param {Object} payload -  data from straatbeeld-api
 *
 * @returns {Object} newState
 */
function showStraatbeeldReducer(state, payload) {
  return {
    ...state,
    straatbeeld: isObject(state.straatbeeld) ? {
      ...state.straatbeeld,
      id: payload.id || state.straatbeeld.id,
      date: payload.date,
      pitch: state.straatbeeld.pitch || null,
      fov: STRAATBEELD_CONFIG.DEFAULT_FOV,
      heading: state.straatbeeld.heading
          ? state.straatbeeld.heading
          : ((Array.isArray(payload.location) &&
              Array.isArray(state.straatbeeld.targetLocation))
              ? getHeadingDegrees(payload.location, state.straatbeeld.targetLocation) : null),
      hotspots: payload.hotspots,
      isLoading: false,
      location: payload.location,
      image: payload.image
    } : state.straatbeeld,
    map: isObject(state.map) && isObject(state.straatbeeld) ? {
      ...state.map,
      isLoading: false,
      viewCenter: isObject(state.straatbeeld) && !Array.isArray(state.straatbeeld.location)
        ? payload.location : state.map.viewCenter
    } : state.map
  };
}

/**
 * @param {Object} oldState
 * @param {Object} payload -  data from straatbeeld-api
 *
 * @returns {Object} newState
 */
function showStraatbeeldSubsequentReducer(oldState, payload) {
  const state = showStraatbeeldReducer(oldState, payload);

  return {
    ...state,
    map: isObject(state.map) ? {
      ...state.map,
      viewCenter: isObject(state.straatbeeld) ? payload.location : state.map.viewCenter
    } : state.map
  };
}

function setOrientationReducer(state, payload) {
  return {
    ...state,
    straatbeeld: isObject(state.straatbeeld) ? {
      ...state.straatbeeld,
      heading: payload.heading,
      pitch: payload.pitch,
      fov: payload.fov
    } : state.straatbeeld
  };
}

function setStraatbeeldHistoryReducer(state, payload) {
  return {
    ...state,
    straatbeeld: isObject(state.straatbeeld) ? {
      ...state.straatbeeld,
      history: payload
    } : state.straatbeeld
  };
}

const reducers = {};

reducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id] = fetchStraatbeeldByIdReducer;
reducers[ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT.id] = fetchStraatbeeldByIdReducer;
reducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id] = fetchStraatbeeldByLocationReducer;
reducers[ACTIONS.SET_STRAATBEELD_HISTORY.id] = setStraatbeeldHistoryReducer;
reducers[ACTIONS.STRAATBEELD_FULLSCREEN.id] = straatbeeldFullscreenReducer;
reducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id] = showStraatbeeldReducer;
reducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id] = showStraatbeeldSubsequentReducer;
reducers[ACTIONS.SET_STRAATBEELD_ORIENTATION.id] = setOrientationReducer;

export default reducers;
