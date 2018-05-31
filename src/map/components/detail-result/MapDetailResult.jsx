import React from 'react';
import PropTypes from 'prop-types';

import { endpointTypes } from '../../services/map-detail';
import MapDetailAdressenLigplaats from './adressen/MapDetailAdressenLigplaats';
import MapDetailAdressenOpenbareRuimte from './adressen/MapDetailAdressenOpenbareRuimte';
import MapDetailAdressenPand from './adressen/MapDetailAdressenPand';
import MapDetailAdressenStandplaats from './adressen/MapDetailAdressenStandplaats';
import MapDetailAdressenVerblijfsobject from './adressen/MapDetailAdressenVerblijfsobject';
import MapDetailBedrijfsinvesteringszone from './MapDetailBedrijfsinvesteringszone';
import MapDetailExplosievenGevrijwaardGebied from './explosieven/MapDetailExplosievenGevrijwaardGebied';
import MapDetailExplosievenInslag from './explosieven/MapDetailExplosievenInslag';
import MapDetailExplosievenUitgevoerdOnderzoek from './explosieven/MapDetailExplosievenUitgevoerdOnderzoek';
import MapDetailExplosievenVerdachtGebied from './explosieven/MapDetailExplosievenVerdachtGebied';
import MapDetailGebiedenBouwblok from './gebieden/MapDetailGebiedenBouwblok';
import MapDetailGebiedenBuurt from './gebieden/MapDetailGebiedenBuurt';
import MapDetailGebiedenGebiedsgerichtWerken from './gebieden/MapDetailGebiedenGebiedsgerichtWerken';
import MapDetailGebiedenGrootstedelijk from './gebieden/MapDetailGebiedenGrootstedelijk';
import MapDetailGebiedenStadsdeel from './gebieden/MapDetailGebiedenStadsdeel';
import MapDetailGebiedenUnesco from './gebieden/MapDetailGebiedenUnesco';
import MapDetailGebiedenWijk from './gebieden/MapDetailGebiedenWijk';
import MapDetailGrondexploitatie from './MapDetailGrondexploitatie';
import MapDetailKadastraalObject from './MapDetailKadastraalObject';
import MapDetailMeetbout from './MapDetailMeetbout';
import MapDetailMonument from './MapDetailMonument';
import MapDetailNapPeilmerk from './MapDetailNapPeilmerk';
import MapDetailVestiging from './MapDetailVestiging';

const MapDetailResult = ({ endpoint, panoUrl, result, onMaximize, onPanoPreviewClick }) => {
  const endpointTypeKey = Object
    .keys(endpointTypes)
    .find((typeKey) => endpoint.includes(endpointTypes[typeKey]));
  const endpointType = endpointTypes[endpointTypeKey];

  switch (endpointType) {
    case endpointTypes.adressenLigplaats:
      return (
        <MapDetailAdressenLigplaats
          ligplaats={result}
          onPanoPreviewClick={onPanoPreviewClick}
          onMaximize={onMaximize}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.adressenNummeraanduiding:
    case endpointTypes.adressenVerblijfsobject:
      return (
        <MapDetailAdressenVerblijfsobject
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          verblijfsobject={result}
        />
      );
    case endpointTypes.adressenOpenbareRuimte:
      return (
        <MapDetailAdressenOpenbareRuimte
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          openbareRuimte={result}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.adressenPand:
      return (
        <MapDetailAdressenPand
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          pand={result}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.adressenStandplaats:
      return (
        <MapDetailAdressenStandplaats
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          standplaats={result}
        />
      );
    case endpointTypes.bedrijfsinvesteringszone:
      return (
        <MapDetailBedrijfsinvesteringszone
          bedrijfsinvesteringszone={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.explosievenGevrijwaardGebied:
      return (
        <MapDetailExplosievenGevrijwaardGebied
          gevrijwaardGebied={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.explosievenInslag:
      return (
        <MapDetailExplosievenInslag
          inslag={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.explosievenUitgevoerdOnderzoek:
      return (
        <MapDetailExplosievenUitgevoerdOnderzoek
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          uitgevoerdOnderzoek={result}
        />
      );
    case endpointTypes.explosievenVerdachtGebied:
      return (
        <MapDetailExplosievenVerdachtGebied
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          verdachtGebied={result}
        />
      );
    case endpointTypes.gebiedenBouwblok:
      return (
        <MapDetailGebiedenBouwblok
          bouwblok={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.gebiedenBuurt:
      return (
        <MapDetailGebiedenBuurt
          buurt={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.gebiedenGebiedsgerichtWerken:
      return (
        <MapDetailGebiedenGebiedsgerichtWerken
          gebiedsgerichtWerken={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.gebiedenGrootstedelijk:
      return (
        <MapDetailGebiedenGrootstedelijk
          grootstedelijk={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.gebiedenStadsdeel:
      return (
        <MapDetailGebiedenStadsdeel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          stadsdeel={result}
        />
      );
    case endpointTypes.gebiedenUnesco:
      return (
        <MapDetailGebiedenUnesco
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          unesco={result}
        />
      );
    case endpointTypes.gebiedenWijk:
      return (
        <MapDetailGebiedenWijk
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          wijk={result}
        />
      );
    case endpointTypes.grondexploitatie:
      return (
        <MapDetailGrondexploitatie
          onMaximize={onMaximize}
          panoUrl={panoUrl}
          detail={result}
        />
      );
    case endpointTypes.kadastraalObject:
      return (
        <MapDetailKadastraalObject
          kadastraalObject={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.meetbout:
      return (
        <MapDetailMeetbout
          meetbout={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.monument:
      return (
        <MapDetailMonument
          monument={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      );
    case endpointTypes.napPeilmerk:
      return (
        <MapDetailNapPeilmerk
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          peilmerk={result}
        />
      );
    case endpointTypes.vestiging:
      return (
        <MapDetailVestiging
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          vestiging={result}
        />
      );
    default:
      return '';
  }
};

MapDetailResult.defaultProps = {
  panoUrl: '',
  result: {}
};

MapDetailResult.propTypes = {
  endpoint: PropTypes.string.isRequired,
  panoUrl: PropTypes.string,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
  result: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default MapDetailResult;
