export default (state = 'HOME', action) => {
  switch(action.type) {
    case 'HOME':
      return 'HOME_PAGE';
    case 'MAP':
      return 'MAP_PAGE';
    case 'PANORAMA':
      return 'PANORAMA_PAGE';
    case 'MAP_PANORAMA':
      return 'MAP_PANORAMA_PAGE';
    default:
      return state;
  }
}
