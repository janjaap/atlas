export default (state = {
  center: {
    lat: 52.3731081,
    lng: 4.8932945
  },
  zoom: 11
}, action) => {
  switch (action.type) {
    case 'PAN':
      return {
        ...state,
        center: {
          lat: action.payload[0],
          lng: action.payload[1],
        }
      };
    case 'ZOOM':
      return {
        ...state,
        zoom: action.payload
      };
    default:
      return state;
  }
}
