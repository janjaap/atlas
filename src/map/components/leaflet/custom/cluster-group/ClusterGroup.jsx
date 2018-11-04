import PropTypes from 'prop-types';

import MarkerClusterGroup from 'react-leaflet-markercluster';
import detailIcon from '../../services/detail-icon';

class ClusterGroup extends MarkerClusterGroup {
  componentDidMount() {
    super.componentDidMount();
    this.tryToGetBounds();
  }

  // TODO: find a event hook in cluster plugin for if clustering is done and then set bounds;
  tryToGetBounds() {
    const bounds = this.leafletElement.getBounds();
    setTimeout(() => {
      if (Object.keys(bounds).length === 0 && bounds.constructor === Object) {
        return this.tryToGetBounds();
      }
      return this.props.getMarkerGroupBounds(bounds);
    }, 50);
  }
}

ClusterGroup.propTypes = {
  ...MarkerClusterGroup.propTypes,
  getMarkerGroupBounds: PropTypes.func,
  markerOptions: PropTypes.shape({}).isRequired
};

ClusterGroup.defaultProps = {
  markerOptions: { icon: detailIcon() }
};

export default ClusterGroup;
