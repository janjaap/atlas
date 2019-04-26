import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem, { MapDetailResultDateItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailExplosievenUitgevoerdOnderzoek = ({
  panoUrl, uitgevoerdOnderzoek, onMaximize, onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={uitgevoerdOnderzoek.label}
    title="Reeds uitgevoerd CE onderzoek"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultDateItem
        label="Datum rapport"
        date={uitgevoerdOnderzoek.date}
      />
      <MapDetailResultItem
        label="Soort rapportage"
        value={uitgevoerdOnderzoek.type}
      />
      <MapDetailResultItem
        label="Onderzoeksgebied"
        value={uitgevoerdOnderzoek.onderzoeksgebied}
      />
      <MapDetailResultItem
        label="Verdacht gebied"
        value={uitgevoerdOnderzoek.verdachtGebied}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailExplosievenUitgevoerdOnderzoek.propTypes = {
  uitgevoerdOnderzoek: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    label: PropTypes.string,
    onderzoeksgebied: PropTypes.string,
    type: PropTypes.string,
    verdachtGebied: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailExplosievenUitgevoerdOnderzoek;
