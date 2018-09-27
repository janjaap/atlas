import React from 'react';
import Link from 'redux-first-router-link'
import routesMap from '../routes-map';

export default () => {
  const keys = Object.keys(routesMap);

  return (
    <div>
      <ul>
        { keys.map((key) => (
          <li key={key}><Link to={{ type: key}}>{key}</Link></li>
        ))}
      </ul>
    </div>
  )
}
