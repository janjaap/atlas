import React from 'react';
import LeafletWrapper from './LeafletWrapper';

export default ({lat, lng, zoom}) => {
  return (
    <div className="map">
      <h2>Map component</h2>
      <div>lat: {lat}</div>
      <div>lng: {lng}</div>
      <div>zoom: {zoom}</div>
      <LeafletWrapper></LeafletWrapper>
    </div>
  )
}
