import get from 'lodash.get';

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
        status: {
          code: result.status ? result.status.code : '',
          description: result.status ? result.status.omschrijving : ''
        },
        eigendomsverhouding: get(result.eigendomsverhouding, 'omschrijving'),
        gebruiksdoelen: (result.gebruiksdoelen || []).map((item) => ({
          ...item,
          description: item.omschrijving,
          descriptionPlus: item.omschrijving_plus
        })),
        label: result._display,
        location: result.location || wgs84Center,
        // The API even returns a value of `1` when the size is unknown
        size: result.oppervlakte > 1 ? result.oppervlakte : 0,
        type: get(result.type_woonobject, 'omschrijving')
      };
    });
}
