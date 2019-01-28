import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

export default function fetchByUri(uri) {
  return fetch(uri)
    .then((response) => response.json())
    .then((result) => {
      const geometryCenter = result.geometrie && getCenter(result.geometrie);
      const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

      return {
        ...result,
        aanduidingInOnderzoek: result.aanduiding_in_onderzoek,
        indicatieGeconstateerd: result.indicatie_geconstateerd,
        label: result._display,
        location: result.location || wgs84Center,
        status: {
          code: result.status ? result.status.code : '',
          description: result.status ? result.status.omschrijving : ''
        }
      };
    });
}
