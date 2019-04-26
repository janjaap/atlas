import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem, { MapDetailResultDateItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailExplosievenInslag = ({ panoUrl, inslag, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={inslag.label}
    title="Inslag"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultDateItem
        label="Datum van inslag"
        date={inslag.date}
      />
      <MapDetailResultItem
        label="Soort handeling"
        value={inslag.type}
      />
      <MapDetailResultItem
        label="Bron"
        value={inslag.source}
      />
      <MapDetailResultItem
        label="Opmerkingen"
        value={inslag.remarks}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailExplosievenInslag.propTypes = {
  inslag: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    label: PropTypes.string,
    remarks: PropTypes.string,
    source: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailExplosievenInslag;
