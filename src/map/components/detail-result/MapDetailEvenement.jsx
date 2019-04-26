import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem, { MapDetailResultUrlItem } from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailEvenement = ({ panoUrl, item, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={item.label}
    title="Evenement"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Startdatum"
        value={item.startdatum}
      />
      <MapDetailResultItem
        label="Einddatum"
        value={item.einddatum}
      />
      <MapDetailResultUrlItem
        label="Meer informatie"
        description={item.url}
        link={item.url}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailEvenement.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailEvenement;
