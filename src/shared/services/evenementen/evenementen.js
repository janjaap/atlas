import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

import { getByUrl } from '../api/api';
import { dateToString } from '../date-formatter/date-formatter';

export const formatEvenementResult = (result) => {
  const geometryCenter = getCenter(result.geometry);
  const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

  return {
    ...result,
    startdatum: result.startdatum ? dateToString(new Date(result.startdatum)) : '',
    einddatum: result.einddatum ? dateToString(new Date(result.einddatum)) : '',
    label: result.titel,
    location: wgs84Center,
    geometrie: result.geometry
  };
};

export default function fetchByUri(uri) {
  return getByUrl(uri)
    .then((result) => formatEvenementResult(result));
}
