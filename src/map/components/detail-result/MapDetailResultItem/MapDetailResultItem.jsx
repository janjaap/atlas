import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultItem = ({ label, value }) => value && (
  <li className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">{label}</div>
      <div className="map-detail-result__item-value">{value}</div>
    </section>
  </li>
);

MapDetailResultItem.defaultProps = {
  value: ''
};

MapDetailResultItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default MapDetailResultItem;
