import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearch from '../components/QuerySearch';
import { getDataSearchLocation } from '../../shared/ducks/data-search/selectors';
import { toMap as toMapAction } from '../../store/redux-first-router/actions';
import SplitScreen from '../components/SplitScreen/SplitScreen';
import LocationSearchContainer from '../containers/LocationSearchContainer';

const SearchPage = ({ geoSearch, toMap }) => {
  if (!geoSearch) {
    return <QuerySearch />;
  }
  return (
    <SplitScreen
      leftComponent={(
        <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
      )}
      rightComponent={(
        <LocationSearchContainer />
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  geoSearch: !!getDataSearchLocation(state)
});

const mapDispatchToProps = (dispatch) => ({
  toMap: () => dispatch(toMapAction(true))
});

SearchPage.propTypes = {
  geoSearch: PropTypes.bool.isRequired,
  toMap: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
