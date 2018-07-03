import { combineReducers } from 'redux';

import MapReducer from '../map/ducks/map/map';
import MapLayersReducer from '../map/ducks/layers/map-layers';
import MapBaseLayersReducer from '../map/ducks/base-layers/map-base-layers';
import MapPanelLayersReducer from '../map/ducks/panel-layers/map-panel-layers';
import MapClickLocationReducer from '../map/ducks/click-location/map-click-location';
import MapDetailReducer from '../map/ducks/detail/map-detail';
import PreviewPanelReducer from '../map/ducks/preview-panel/map-preview-panel';
import userReducer from './user';
import uiReducer from '../shared/ducks/ui/ui';
import AutoSuggestReducer from '../header/ducks/auto-suggest/auto-suggest';
import { detailReducer } from './details';
import MapSearchResultsReducer from '../map/ducks/search-results/map-search-results';


const mapLayers = combineReducers({
  layers: MapLayersReducer,
  baseLayers: MapBaseLayersReducer,
  panelLayers: MapPanelLayersReducer
});

const rootReducer = combineReducers({
  map: MapReducer,
  mapLayers,
  ui: uiReducer,
  mapDetail: MapDetailReducer,
  user: userReducer,
  mapClickLocation: MapClickLocationReducer,
  autoSuggest: AutoSuggestReducer,
  detail: detailReducer,
  mapSearchResultsByLocation: MapSearchResultsReducer,
  isMapPreviewPanelVisible: PreviewPanelReducer
});

export default rootReducer;
