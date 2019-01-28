import { getByUrl } from '../../../shared/services/api/api';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config';
import MAP_CONFIG from '../map-config';

const generateParams = (layer, location, zoom) => ({
  lat: location.latitude,
  lon: location.longitude,
  item: layer.detailItem,
  radius: layer.detailIsShape ? 0 :
    Math.round((2 ** (MAP_CONFIG.BASE_LAYER_OPTIONS.maxZoom - zoom)) / 2)
});

export const sortResults = (results) => (
  results.sort((a, b) => {
    if (!a.detailIsShape) {
      if (!b.detailIsShape) {
        return a.distance - b.distance;
      }
      return -1;
    }
    return 1;
  }));

const retrieveLayers = (detailItems, detailIsShape) => (
  detailItems.map((item) => ({
    detailIsShape,
    ...item.properties
  })));

export default async function fetchNearestDetail(location, layers, zoom) {
  const results = sortResults(
    (
      await Promise.all(
        layers.map(async (layer) => {
          const params = generateParams(layer, location, zoom);
          const result = await getByUrl(SHARED_CONFIG.API_ROOT + layer.detailUrl, params);
          return retrieveLayers(result.features, layer.detailIsShape);
        })
      )
    )
    .reduce(/* istanbul ignore next */ (a, b) => ([...a, ...b]))
  );
  return results[0] ? results[0].uri : '';
}
