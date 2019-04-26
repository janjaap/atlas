import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../../../../shared/services/date-formatter/date-formatter';

const MapDetailResultDateItem = ({ label, date }) => {
  const dateString = date && formatDate(date);

  return dateString && (
    <div className="map-detail-result__item">
      <section className="map-detail-result__item-content">
        <div className="map-detail-result__item-label">{label}</div>
        <div className="map-detail-result__item-value">{dateString}</div>
      </section>
    </div>
  );
};

MapDetailResultDateItem.defaultProps = {
  date: null
};

MapDetailResultDateItem.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date)
};

export default MapDetailResultDateItem;
