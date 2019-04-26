import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem, { MapDetailResultStatusItem } from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import Notification from '../../../../shared/components/notification/Notification';

const statusToCssModifier = {
  24: 'info',
  25: 'info',
  26: 'info',
  27: 'info',
  28: 'info',
  29: 'info',
  30: '',
  31: '',
  32: 'info'
};

const MapDetailAdressenPand = ({ panoUrl, pand, onMaximize, onPanoPreviewClick }) => {
  const statusLevel = statusToCssModifier[pand.status.code];
  return (
    <MapDetailResultWrapper
      panoUrl={panoUrl}
      onMaximize={onMaximize}
      onPanoPreviewClick={onPanoPreviewClick}
      subTitle={pand.label}
      title="Pand"
    >
      <ul className="map-detail-result__list">
        {statusLevel && <li className="map-detail-result__notification">
          <Notification
            level={statusLevel}
            canClose={false}
          >{pand.status.description}</Notification>
        </li>}
        <MapDetailResultItem
          label="Oorspronkelijk bouwjaar"
          value={pand.year || 'onbekend'}
        />
        <MapDetailResultItem
          label="Naam"
          value={pand.name}
        />
        <MapDetailResultStatusItem
          label="Status"
          value={pand.status.description}
          status={statusLevel}
        />
      </ul>
    </MapDetailResultWrapper>
  );
};

MapDetailAdressenPand.propTypes = {
  pand: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }).isRequired,
    name: PropTypes.string,
    year: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenPand;
