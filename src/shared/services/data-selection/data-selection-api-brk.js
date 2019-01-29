import identity from 'lodash.identity';
import generateId from '../state-token-generator/state-token-generator';
import { query as DSQuery } from './data-selection-api-data-selection';
import sharedConfig from '../shared-config/shared-config';
import { getByUrl } from '../api/api';

export function query(config, view, activeFilters, page, search, geometryFilter) {
  return DSQuery(config, view, activeFilters, page, search, geometryFilter);
}

export function getMarkers(config, activeFilters, zoomLevel, boundingBox) {
  const params = {
    ...activeFilters,
    zoom: zoomLevel,
    bbox: JSON.stringify({
      _northEast: {
        lat: boundingBox.northEast.latitude,
        lng: boundingBox.northEast.longitude
      },
      _southWest: {
        lat: boundingBox.southWest.latitude,
        lng: boundingBox.southWest.longitude
      }
    })
  };
  return boundingBox ? getByUrl(sharedConfig.API_ROOT + config.ENDPOINT_MARKERS, params)
      .then((data) => ({
        geoJsons: [
          data.eigenpercelen && {
            geoJson: data.eigenpercelen,
            id: generateId(),
            type: 'dataSelection'
          },
          data.niet_eigenpercelen && {
            geoJson: data.niet_eigenpercelen,
            id: generateId(),
            type: 'dataSelectionAlternate'
          },
          {
            geoJson: {
              coordinates: [
                [
                  [data.extent[0], data.extent[1]],
                  [data.extent[2], data.extent[3]]
                ]
              ],
              type: 'Polygon'
            },
            id: generateId(),
            type: 'dataSelectionBounds'
          }
        ].filter(identity),
        markers: data.appartementen.map((appartement) => ({
          iconData: {
            zoomLevel,
            count: appartement.aantal
          },
          position: [
            appartement.geometrie.coordinates[1],
            appartement.geometrie.coordinates[0]
          ],
          type: 'dataSelectionType'
        }))
      }))
    : Promise.resolve([]);
}

export default {
  query,
  getMarkers
};
