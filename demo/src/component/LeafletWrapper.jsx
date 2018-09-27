import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default () => {

  const position = [51.505, 4.9]
  return(
    <Map center={position} zoom={13} >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

