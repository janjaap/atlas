import { createSelector } from 'reselect';

export const getDataSelection = (state) => state.dataSelection;

export const getMapData = createSelector([getDataSelection],
  (dataSelection) => dataSelection && dataSelection.markers);

export const getClusterMarkers = createSelector([getMapData],
  (markers) => (
    markers && markers.clusterMarkers && markers.clusterMarkers.length ?
      markers.clusterMarkers : []
  ));

export const getGeoJsons = createSelector([getMapData],
  (markers) => (
    markers && markers.geoJsons && markers.geoJsons.length ?
      markers.geoJsons : []
  ));

export const getMarkers = createSelector([getMapData],
  (markers) => (
    markers && markers.markers && markers.markers.length ?
      markers.markers : []
  ));
