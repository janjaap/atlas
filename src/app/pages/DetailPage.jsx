import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import DetailContainer from '../containers/DetailContainer';
import {
  DETAIL_VIEW,
  getDetailEndpoint,
  getDetailGeometry,
  getDetailView
} from '../../shared/ducks/detail/detail';
import { getPageActionEndpoint as endpointActionCreator } from '../../store/redux-first-router';
import SplitScreen from '../components/SplitScreen/SplitScreen';

/* istanbul ignore next */ // TODO: refactor, test
const DetailPage = ({ view: routeView, hasGeometry, endpoint, getPageActionEndpoint }) => {
  let view = routeView;
  if (routeView === DETAIL_VIEW.MAP_DETAIL) {
    // Hide map if no geometry is available
    view = hasGeometry ? DETAIL_VIEW.MAP_DETAIL : DETAIL_VIEW.DETAIL;
  }
  const toMap = () => getPageActionEndpoint(endpoint, DETAIL_VIEW.MAP);

  switch (view) {
    case DETAIL_VIEW.DETAIL:
      return (
        <DetailContainer />
      );
    case DETAIL_VIEW.MAP:
      return <MapContainer isFullscreen showPreviewPanel />;
    default: {
      return (
        <SplitScreen
          leftComponent={(
            <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
          )}
          rightComponent={(
            <DetailContainer />
          )}
        />
      );
    }
  }
};

const mapStateToProps = (state) => ({
  hasGeometry: Boolean(getDetailGeometry(state)),
  view: getDetailView(state),
  endpoint: getDetailEndpoint(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPageActionEndpoint: endpointActionCreator
}, dispatch);

DetailPage.propTypes = {
  hasGeometry: PropTypes.bool.isRequired,
  view: PropTypes.oneOf(Object.keys(DETAIL_VIEW)).isRequired,
  endpoint: PropTypes.string.isRequired,
  getPageActionEndpoint: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);