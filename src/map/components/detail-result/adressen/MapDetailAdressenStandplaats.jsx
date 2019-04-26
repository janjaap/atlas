import React from 'react';
import PropTypes from 'prop-types';

import { MapDetailResultStatusItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import Notification from '../../../../shared/components/notification/Notification';

const MapDetailAdressenStandplaats = ({
  panoUrl,
  standplaats,
  onMaximize,
  onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={standplaats.label}
    title="Adres (standplaats)"
  >
    <ul className="map-detail-result__list">
      {standplaats.indicatieGeconstateerd && <li className="map-detail-result__notification">
        <Notification
          level="alert"
          canClose={false}
        >Indicatie geconstateerd</Notification>
      </li>}
      {standplaats.aanduidingInOnderzoek && <li className="map-detail-result__notification">
        <Notification
          level="alert"
          canClose={false}
        >In onderzoek</Notification>
      </li>}
      <MapDetailResultStatusItem
        label="Indicatie geconstateerd"
        value={standplaats.indicatieGeconstateerd ? 'Ja' : 'Nee'}
        status={standplaats.indicatieGeconstateerd ? 'alert' : ''}
      />
      <MapDetailResultStatusItem
        label="Aanduiding in onderzoek"
        value={standplaats.aanduidingInOnderzoek ? 'Ja' : 'Nee'}
        status={standplaats.aanduidingInOnderzoek ? 'alert' : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenStandplaats.propTypes = {
  standplaats: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    indicatieGeconstateerd: PropTypes.boolean,
    label: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenStandplaats;
