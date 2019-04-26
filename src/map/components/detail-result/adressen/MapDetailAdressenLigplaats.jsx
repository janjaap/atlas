import React from 'react';
import PropTypes from 'prop-types';

import { MapDetailResultStatusItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import Notification from '../../../../shared/components/notification/Notification';

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
    title="Adres (ligplaats)"
  >
    <ul className="map-detail-result__list">
      {ligplaats.indicatieGeconstateerd && <li className="map-detail-result__notification">
        <Notification
          level="alert"
          canClose={false}
        >Indicatie geconstateerd</Notification>
      </li>}
      {ligplaats.aanduidingInOnderzoek && <li className="map-detail-result__notification">
        <Notification
          level="alert"
          canClose={false}
        >In onderzoek</Notification>
      </li>}
      <MapDetailResultStatusItem
        label="Indicatie geconstateerd"
        value={ligplaats.indicatieGeconstateerd ? 'Ja' : 'Nee'}
        status={ligplaats.indicatieGeconstateerd ? 'alert' : ''}
      />
      <MapDetailResultStatusItem
        label="Aanduiding in onderzoek"
        value={ligplaats.aanduidingInOnderzoek ? 'Ja' : 'Nee'}
        status={ligplaats.aanduidingInOnderzoek ? 'alert' : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenLigplaats.propTypes = {
  ligplaats: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    indicatieGeconstateerd: PropTypes.boolean,
    label: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenLigplaats;
