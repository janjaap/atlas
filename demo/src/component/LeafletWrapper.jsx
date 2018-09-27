import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

const LeafletWrapper = ({position, zoom, onPan, onZoom}) => {
  const onViewportChanged = (viewport) => {
    console.log(viewport)
    if(viewport.zoom != zoom) {
      onZoom(viewport.zoom);
    }
    if(viewport.center[0] != position[0] || viewport.center[1] != position[1]) {
      onPan(viewport.center);
    }
  };

  return(
    <Map center={position} zoom={zoom}
         onViewportChanged={onViewportChanged}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

const stateToProps = (state) => ({
  position: [
    state.map.center.lat,
    state.map.center.lng
  ],
  zoom: state.map.zoom
});
const dispatchToProps = (dispatch) => ({
  onZoom: (level) => dispatch({ type: 'ZOOM', payload: level }),
  onPan: (center) => dispatch({ type: 'PAN', payload: center })
});


export default connect(stateToProps, dispatchToProps)(LeafletWrapper);
