import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { maximizeMapPreviewPanel, closeMapPreviewPanel, fetchSearchResults }
  from '../../ducks/preview-panel/map-preview-panel';
import { selectLatestMapSearchResults }
  from '../../ducks/search-results/map-search-results';
import { selectNotClickableVisibleMapLayers } from '../../ducks/panel-layers/map-panel-layers';
import { selectLatestMapDetail } from '../../ducks/detail/map-detail';
import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';
import { fetchStraatbeeldById } from '../../ducks/straatbeeld/straatbeeld';
import { fetchDetail as legacyFetchDetail } from '../../../reducers/details';
import MapPreviewPanel from './MapPreviewPanel';


const mapStateToProps = (state) => ({
  isMapPreviewPanelVisible: state.isMapPreviewPanelVisible,
  mapClickLocation: state.mapClickLocation,
  pano: state.pano,
  results: selectLatestMapSearchResults(state),
  search: state.search,
  searchLocation: state.search && state.search.location && {
    latitude: state.search.location[0],
    longitude: state.search.location[1]
  },
  searchLocationId: state.search && state.search.location && state.search.location.toString(),
  missingLayers: selectNotClickableVisibleMapLayers(state)
    .map((mapLayer) => mapLayer.title)
    .join(', '),
  detail: state.detail,
  mapDetail: state.mapDetail,
  detailResult: selectLatestMapDetail(state) || {},
  user: state.user,
  isEmbed: state.ui && (state.ui.isEmbed || state.ui.isEmbedPreview)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSearch: fetchSearchResults,
  onMapPreviewPanelClose: closeMapPreviewPanel,
  onMapPreviewPanelMaximize: maximizeMapPreviewPanel,
  onMapSearchResultsItemClick: legacyFetchDetail,
  onOpenPanoById: fetchStraatbeeldById,
  closeMapFullScreen: toggleMapFullscreen
}, dispatch);

/* eslint-enable react/no-unused-prop-types */
export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewPanel);
