import { call, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchFetchPanoramaEffect } from '../../panorama/sagas/panorama';
import {
  fetchGeoSearchResultsEffect,
  fetchQuerySearchEffect,
  fetchQuerySearchResultsEffect
} from '../../shared/sagas/data-search/data-search';
import { fetchDataSelectionEffect } from '../../shared/sagas/data-selection/data-selection';
import { fetchDatasetsEffect } from '../../shared/sagas/dataset/dataset';
import { fetchDetailEffect } from '../../map/sagas/detail/map-detail';

const yieldOnFirstAction = (sideEffect) => (function* gen(action) {
  const { skipSaga, firstAction, forceSaga } = action.meta || {};
  console.log('..', action)
  if (!skipSaga && (firstAction || forceSaga)) {
    console.log('cal')
    yield call(sideEffect, action);
  }
});

export default function* routeSaga() {
  yield takeLatest([routing.panorama.type], yieldOnFirstAction(
    fetchFetchPanoramaEffect
  ));
  yield takeLatest([routing.dataGeoSearch.type], yieldOnFirstAction(
    fetchGeoSearchResultsEffect
  ));

  yield takeLatest([
    routing.addresses.type,
    routing.establishments.type,
    routing.cadastralObjects.type
  ], yieldOnFirstAction(fetchDataSelectionEffect));

  yield takeLatest([
    routing.datasets.type,
    routing.datasetsDetail.type
  ], yieldOnFirstAction(fetchDatasetsEffect));

  yield takeLatest(
    routing.dataSearchCategory.type,
    yieldOnFirstAction(fetchQuerySearchResultsEffect)
  );

  yield takeLatest([
    routing.dataQuerySearch.type,
    routing.searchDatasets.type
  ], yieldOnFirstAction(fetchQuerySearchEffect));

  yield takeLatest([
    routing.dataDetail.type
  ], yieldOnFirstAction(fetchDetailEffect));
}
