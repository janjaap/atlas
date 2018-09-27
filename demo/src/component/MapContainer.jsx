import connect from 'react-redux/es/connect/connect';

import Map from './Map';

const stateToProps = (state) => ({
  lat: state.map.lat,
  lng: state.map.lng,
});

export default connect(stateToProps)(Map);
