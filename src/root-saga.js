import { all, fork } from 'redux-saga/effects';

import watchFetchPanoPreview from './pano/sagas/preview/pano-preview';
import watchFetchSuggestions from './header/sagas/auto-suggest/auto-suggest';
import watchFetchMapSearchResults from './map/sagas/search-results/map-search-results';
import watchFetchMapBaseLayers from './map/sagas/map-base-layers';
import watchFetchMapLayers from './map/sagas/map-layers';
import watchFetchMapPanelLayers from './map/sagas/map-panel-layers';
import watchFetchMapDetail from './map/sagas/detail';
import watchMapClick from './map/sagas/map-click';
import watchFetchNearestDetails from './map/sagas/nearest-details';
import watchGeoSearchRequest from './map/sagas/geosearch';
import watchFetchCatalogFilters from './catalog/sagas/data-selection/data-selection';

export default function* rootSaga() {
  yield all([
    fork(watchFetchPanoPreview),
    fork(watchFetchSuggestions),
    fork(watchFetchMapSearchResults),
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers),
    fork(watchFetchMapPanelLayers),
    fork(watchFetchMapDetail),
    fork(watchMapClick),
    fork(watchFetchNearestDetails),
    fork(watchGeoSearchRequest),
    fork(watchFetchCatalogFilters)
  ]);
}
