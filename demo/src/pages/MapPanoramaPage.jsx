import React from 'react';
import Panorama from '../component/Panorama';
import MapContainer from '../component/MapContainer';

export default () => {
  return (
    <div>
      <h1 className="hide">Map panorama page</h1>
      <div className="block-half-page">
        <MapContainer />
      </div>
      <div className="block-half-page">
        <Panorama></Panorama>
      </div>
    </div>
  )
}
