import connect from 'react-redux/es/connect/connect';

import Map from './Map';

const stateToProps = (state) => ({
  lat: state.map.center.lat,
  lng: state.map.center.lng,
  zoom: state.map.zoom,
});

export default connect(stateToProps)(Map);
