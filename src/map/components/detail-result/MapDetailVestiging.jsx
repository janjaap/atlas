import React from 'react';
import PropTypes from 'prop-types';

import MapDetailAddressItem from './MapDetailAddressItem';
import MapDetailResultItem, { MapDetailResultStatusItem } from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';
import MapDetailVestigingActiviteitenItem from './MapDetailVestigingActiviteitenItem';
import Notification from '../../../shared/components/notification/Notification';

const MapDetailVestiging = ({ panoUrl, vestiging, onMaximize, onPanoPreviewClick }) => {
  const special = vestiging.bijzondereRechtstoestand &&
    (vestiging.bijzondereRechtstoestand.faillissement ||
      vestiging.bijzondereRechtstoestand.surseanceVanBetaling);
  const specialLabel = vestiging.bijzondereRechtstoestand &&
    vestiging.bijzondereRechtstoestand.faillissement ? 'Faillissement' : 'Surseance van betaling';

  return (
    <MapDetailResultWrapper
      panoUrl={panoUrl}
      onMaximize={onMaximize}
      onPanoPreviewClick={onPanoPreviewClick}
      subTitle={vestiging.label}
      title="Vestiging"
    >
      {vestiging.label ? (
        <ul className="map-detail-result__list">
          {special && <li className="map-detail-result__notification">
            <Notification
              level="alert"
              canClose={false}
            >{specialLabel}</Notification>
          </li>}
          <MapDetailResultItem
            label="KvK-nummer"
            value={vestiging.kvkNumber}
          />
          <MapDetailResultItem
            label="Vestigingsnummer"
            value={vestiging.vestigingsnummer}
          />
          <MapDetailAddressItem
            label="Bezoekadres"
            values={vestiging.visitingAddress}
          />
          <MapDetailVestigingActiviteitenItem activities={vestiging.activities} />
          <MapDetailResultItem
            label="Type vestiging"
            value={vestiging.hoofdvestiging ? 'Hoofdvestiging' : 'Nevenvestiging'}
          />
          {special && (<MapDetailResultStatusItem
            label="Soort bijzondere rechtstoestand"
            value={specialLabel}
            status="alert"
          />)}
        </ul>
      ) : (
        <Notification>
          Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om
          maatschappelijke activiteiten en vestigingen te bekijken.
        </Notification>
      )}
    </MapDetailResultWrapper>
  );
};

MapDetailVestiging.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  vestiging: PropTypes.shape({
    activities: PropTypes.array,
    bijzondereRechtstoestand: PropTypes.shape({
      faillissement: PropTypes.boolean,
      status: PropTypes.string,
      surseanceVanBetaling: PropTypes.boolean
    }),
    kvkNumber: PropTypes.string,
    label: PropTypes.string,
    visitingAddress: PropTypes.object,
    hoofdvestiging: PropTypes.bool,
    vestigingsnummer: PropTypes.string
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailVestiging;
