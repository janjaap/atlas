import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem, { MapDetailResultDateItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailExplosievenGevrijwaardGebied = ({
  panoUrl, gevrijwaardGebied, onMaximize, onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={gevrijwaardGebied.label}
    title="Gevrijwaard gebied"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultDateItem
        label="Datum rapport"
        date={gevrijwaardGebied.date}
      />
      <MapDetailResultItem
        label="Soort handeling"
        value={gevrijwaardGebied.type}
      />
      <MapDetailResultItem
        label="Bron"
        value={gevrijwaardGebied.source}
      />
      <MapDetailResultItem
        label="Opmerkingen"
        value={gevrijwaardGebied.remarks}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailExplosievenGevrijwaardGebied.propTypes = {
  gevrijwaardGebied: PropTypes.shape({
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

export default MapDetailExplosievenGevrijwaardGebied;
