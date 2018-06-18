import ACTIONS from '../../../shared/actions';

export const getMapClickLocation = (state) => state.mapClickLocation;

export const SET_MAP_CLICK_LOCATION = 'SET_MAP_CLICK_LOCATION';

const initialState = {};

export default function MapClickLocationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_CLICK_LOCATION:
      return action.location;

    default:
      return state;
  }
}

export const setMapClickLocation = (location) => ({ type: SET_MAP_CLICK_LOCATION, location });

export const updateClick = (payload) => ({
  type: ACTIONS.SET_MAP_CLICK_LOCATION.id,
  location: {
    latitude: payload.latlng.lat,
    longitude: payload.latlng.lng
  }
});

window.reducers = window.reducers || {};
window.reducers.MapClickLocationReducer = MapClickLocationReducer;
