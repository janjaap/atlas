import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultUrlItem = ({ label, description, link }) => link && (
  <li className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">{label}</div>
      <div className={'map-detail-result__item-value'}>
        <a
          className={'o-btn o-btn--link map-detail-result__item-value--inline'}
          href={link}
          target="_blank"
        >{description}</a>
      </div>
    </section>
  </li>
);

MapDetailResultUrlItem.defaultProps = {
  description: '',
  link: ''
};

MapDetailResultUrlItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string
};

export default MapDetailResultUrlItem;
