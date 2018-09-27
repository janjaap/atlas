import React from 'react';

export default ({lat, lng}) => {
  return (
    <div className="map">
      <h2>Map component</h2>
      <div>lat: {lat}</div>
      <div>lng: {lng}</div>
    </div>
  )
}
