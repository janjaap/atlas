import { connect } from 'react-redux';
import { getUser } from '../../../shared/ducks/user/user';
import { isPrintMode } from '../../../shared/ducks/ui/ui';
import {
  getPanoramaPreview,
  isPanoramaPreviewLoading
} from '../../../panorama/ducks/preview/panorama-preview';
import Detail from './Detail';
import {
  getDetailEndpoint,
  isDetailLoading,
  getDetailTemplateUrl,
  getDetailData,
  getDetailFilterSelection
} from '../../../shared/ducks/detail/selectors';


const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state),
  previewPanorama: getPanoramaPreview(state),
  isPreviewPanoramaLoading: isPanoramaPreviewLoading(state),
  detailTemplateUrl: getDetailTemplateUrl(state),
  detailData: getDetailData(state),
  detailFilterSelection: getDetailFilterSelection(state),
  printMode: isPrintMode(state)
});

export default connect(mapStateToProps)(Detail);
