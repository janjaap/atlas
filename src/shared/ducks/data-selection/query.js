import {
  FETCH_DATA_SELECTION_SUCCESS,
  initialState,
  RESET_DATA_SELECTION,
  SET_GEOMETRY_FILTERS,
  SET_PAGE,
  SET_VIEW, VIEWS
} from './constants';
import { getDataSelectionPage, getGeometryFilters, isListView } from './selectors';

const getEncodedGeometryFilters = (state) => {
  const { markers, description } = getGeometryFilters(state);
  if (markers && description) {
    return btoa(JSON.stringify({
      markers: markers.map((latLong) => `${latLong[0]}:${latLong[1]}`).join('|'),
      description
    }));
  }
  return undefined;
};

const getDecodedGeometryFilters = (geo) => {
  let geometryFilter = initialState.geometryFilter;
  if (geo) {
    const { markers, description } = JSON.parse(atob(geo));
    geometryFilter = {
      markers: markers && markers.length
        ? markers.split('|').map((latLng) => latLng.split(':').map((str) => parseFloat(str)))
        : [],
      description
    };
  }

  return geometryFilter;
};

export default {
  page: {
    stateKey: 'page',
    selector: getDataSelectionPage,
    decode: (val) => val,
    defaultValue: 1
  },
  geo: {
    stateKey: 'geometryFilter',
    selector: getEncodedGeometryFilters,
    decode: getDecodedGeometryFilters
  },
  listView: {
    stateKey: 'view',
    selector: isListView,
    decode: (listView) => (listView ? VIEWS.LIST : VIEWS.TABLE),
    defaultValue: initialState.view === VIEWS.LIST
  }
};

export const ACTIONS = [
  SET_PAGE,
  SET_GEOMETRY_FILTERS,
  RESET_DATA_SELECTION,
  FETCH_DATA_SELECTION_SUCCESS,
  SET_VIEW
];