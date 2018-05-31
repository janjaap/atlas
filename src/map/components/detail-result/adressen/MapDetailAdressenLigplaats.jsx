import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenLigplaats = ({
  panoUrl,
ligplaats,
onMaximize,
onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    panoUrl={panoUrl}
    subTitle={ligplaats.label}
    title="Ligplaats"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Status"
        value={ligplaats.status.description}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenLigplaats.propTypes = {
  ligplaats: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }).isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenLigplaats;
