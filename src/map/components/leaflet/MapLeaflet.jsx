import React from 'react';
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';
import { GeoJSON, Map, ScaleControl, TileLayer, ZoomControl } from 'react-leaflet';

import CustomMarker from './custom/marker/CustomMarker';
import ClusterGroup from './custom/cluster-group/ClusterGroup';
import NonTiledLayer from './custom/non-tiled-layer';
import icons from './services/icons.constant';
import geoJsonConfig from './services/geo-json-config.constant';
import markerConfig from './services/marker-config.constant';
import createClusterIcon from './services/cluster-icon';
import { boundsToString, getBounds, isBoundsAPoint, isValidBounds } from './services/bounds';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import { DEFAULT_LAT, DEFAULT_LNG } from '../../ducks/map/constants';
import RdGeoJson from './custom/geo-json/RdGeoJson';
import mapLayerTypes from '../../services/map-layers/map-layer-types.config';

const visibleToOpacity = ((isVisible) => (isVisible ? 100 : 0));

const convertBounds = (map) => {
  const leafletBounds = map.getBounds();
  return ({
    northEast: [
      leafletBounds._northEast.lat,
      leafletBounds._northEast.lng
    ],
    southWest: [
      leafletBounds._southWest.lat,
      leafletBounds._southWest.lng
    ]
  });
};

class MapLeaflet extends React.Component {
  constructor(props) {
    super(props);
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.onClusterGroupBounds = this.onClusterGroupBounds.bind(this);
    this.state = {
      pendingLayers: [],
      previousFitBoundsId: ''
    };

    this.setMapElement = (element) => {
      if (element && element.leafletElement) {
        this.MapElement = element.leafletElement;
        this.props.getLeafletInstance(this.MapElement);
      }
    };

    this.setActiveElement = (element) => {
      if (element) {
        this.activeElement = element.leafletElement;
        this.checkIfActiveElementNeedsUpdate(this.activeElement);
      }
    };
  }

  onZoomEnd(event) {
    this.props.onZoomEnd({
      zoom: event.target.getZoom(),
      maxZoom: event.target.getMaxZoom(),
      minZoom: event.target.getMinZoom(),
      center: event.target.getCenter(),
      boundingBox: convertBounds(this.MapElement)
    });
  }

  onClick(event) {
    const { latlng, containerPoint, layerPoint } = event;
    this.props.onClick({
      latlng,
      containerPoint,
      layerPoint
    });
  }

  onDragEnd(event) {
    this.props.onDragEnd({
      center: event.target.getCenter(),
      boundingBox: convertBounds(this.MapElement)
    });
  }

  onClusterGroupBounds(bounds) {
    this.fitActiveElement(bounds);
  }

  handleResize() {
    this.MapElement.invalidateSize();
    this.props.onResizeEnd({
      boundingBox: convertBounds(this.MapElement)
    });
    if (this.activeElement) {
      this.fitActiveElement(getBounds(this.activeElement));
    }
  }

  checkIfActiveElementNeedsUpdate(element) {
    const elementBounds = getBounds(element);
    const elementBoundsId = boundsToString(elementBounds);
    // check if the bounds are the same in that case we don't need to update
    if (elementBoundsId !== this.state.previousFitBoundsId && isValidBounds(elementBounds)) {
      this.fitActiveElement(elementBounds);
      this.zoomToActiveElement(elementBounds);
      this.setState({ previousFitBoundsId: elementBoundsId });
    }
  }

  zoomToActiveElement(bounds) {
    const { zoom } = this.props;
    // if the bounds is not valid or is a point return
    if (isBoundsAPoint(bounds)) {
      return;
    }
    // check wat the zoomlevel will be of the bounds and devide it with some margin
    const maxZoom = Math.round(this.MapElement.getBoundsZoom(bounds) / 1.25);
    // if the elementBounds is still bigger then the current zoom level
    if (maxZoom > zoom) {
      // zoom and pan the map to fit the bounds with a maxZoom
      this.MapElement.fitBounds(bounds, { maxZoom });
    }
  }

  fitActiveElement(bounds) {
    if (!isValidBounds(bounds)) {
      return;
    }
    const { zoom } = this.props;
    const mapBounds = this.MapElement.getBounds();
    const elementFits = mapBounds.contains(bounds);
    if (!elementFits) {
      const elementZoom = this.MapElement.getBoundsZoom(bounds);
      if (!isBoundsAPoint(bounds) && elementZoom < zoom) {
        // pan and zoom to the geoJson element, only when not a point
        this.MapElement.fitBounds(bounds);
      } else {
        // only pan to the geoJson element
        this.MapElement.panInsideBounds(bounds);
      }
    }
  }

  handleLoading(layer) {
    const { _leaflet_id: leafletId } = layer;

    this.setState((state) => ({
      pendingLayers: !state.pendingLayers.includes(leafletId)
        ? [...state.pendingLayers, leafletId]
        : state.pendingLayers
    }));
  }

  handleLoaded(layer) {
    const { _leaflet_id: leafletId } = layer;

    this.setState((state) => ({
      pendingLayers: state.pendingLayers.filter((layerId) => layerId !== leafletId)
    }));
  }

  render() {
    const {
      center,
      clusterMarkers,
      baseLayer,
      geoJsons,
      rdGeoJsons,
      layers,
      mapOptions,
      markers,
      marker,
      scaleControlOptions,
      zoomControlOptions,
      zoom,
      brkMarkers,
      isLoading
    } = this.props;

    const tmsLayers = layers.filter((layer) => (layer.type === mapLayerTypes.TMS));
    const nonTmsLayers = layers.filter((layer) => (layer.type !== mapLayerTypes.TMS));

    const loadingHandlers = {
      onLoading: ({ sourceTarget }) => this.handleLoading(sourceTarget),
      onLoad: ({ sourceTarget }) => this.handleLoaded(sourceTarget)
    };

    return (
      <ResizeAware
        style={{
          bottom: '0',
          left: '0',
          position: 'absolute',
          right: '0',
          top: '0'
        }}
        onlyEvent
        onResize={this.handleResize}
      >
        <Map
          ref={this.setMapElement}
          onZoomEnd={this.onZoomEnd}
          onClick={this.onClick}
          onDragEnd={this.onDragEnd}
          onDraw={this.draw}
          center={center}
          zoom={zoom}
          onLayerRemove={({ layer }) => this.handleLoaded(layer)}
          {...mapOptions}
        >
          <TileLayer
            {...baseLayer.baseLayerOptions}
            url={baseLayer.urlTemplate}
            {...loadingHandlers}
          />
          {tmsLayers.map(({ id: key, isVisible, url, bounds }) => (
            <TileLayer
              {...{
                key,
                url,
                bounds
              }}
              tms
              subdomains={baseLayer.baseLayerOptions.subdomains}
              minZoom={baseLayer.baseLayerOptions.minZoom}
              maxZoom={baseLayer.baseLayerOptions.maxZoom}
              zoom={zoom}
              opacity={visibleToOpacity(isVisible)}
              {...loadingHandlers}
            />
          ))}

          {nonTmsLayers.map(({ id: key, isVisible, url, params, overlayOptions }) => (
            <NonTiledLayer
              {...{
                key,
                url,
                params
              }}
              {...overlayOptions}
              opacity={visibleToOpacity(isVisible)}
              {...loadingHandlers}
            />
          ))}
          {
            Boolean(clusterMarkers.length) && (
              <ClusterGroup
                markers={clusterMarkers}
                showCoverageOnHover={false}
                iconCreateFunction={createClusterIcon}
                spiderfyOnMaxZoom={false}
                animate={false}
                maxClusterRadius={50}
                chunkedLoading
                getMarkerGroupBounds={this.onClusterGroupBounds}
                ref={this.setActiveElement}
                disableClusteringAtZoom={baseLayer.baseLayerOptions.maxZoom}
              />
            )
          }
          {
            markers.map((item) => Boolean(item.position) && (
              <CustomMarker
                ref={markerConfig[item.type].requestFocus && this.setActiveElement}
                position={item.position}
                key={item.position.toString() + item.type}
                icon={icons[item.type](item.iconData)}
                zIndexOffset={100}
                rotationAngle={item.heading || 0}
              />
            ))
          }
          {
            brkMarkers.map((item) => Boolean(item.position) && (
              <CustomMarker
                ref={markerConfig[item.type].requestFocus && this.setActiveElement}
                position={item.position}
                key={item.position.toString() + item.type}
                icon={icons[item.type](item.iconData)}
                zIndexOffset={100}
                rotationAngle={item.heading || 0}
              />
            ))
          }
          {
            marker && (
              <CustomMarker
                position={marker.position}
                key={marker.toString()}
                icon={icons[marker.type](marker.iconData)}
              />
            )
          }

          {
            geoJsons.map((shape) => Boolean(shape.geoJson) && (
              <GeoJSON
                data={shape.geoJson}
                key={shape.id}
                style={geoJsonConfig[shape.type] && geoJsonConfig[shape.type].style}
                ref={geoJsonConfig[shape.type].requestFocus && this.setActiveElement}
              />
            ))
          }
          {
            rdGeoJsons.map((shape) =>
              Boolean(shape.geoJson) && (
                <RdGeoJson
                  data={shape.geoJson}
                  key={shape.id}
                  ref={rdGeoJsons.length === 1 && this.setActiveElement}
                />
              )
            )
          }
          <ScaleControl {...scaleControlOptions} />
          {
            this.props.isZoomControlVisible && (
              <ZoomControl {...zoomControlOptions} />
            )
          }
          <LoadingIndicator loading={isLoading || this.state.pendingLayers.length > 0} />

        </Map>
      </ResizeAware>
    );
  }
}

/* istanbul ignore next */
MapLeaflet.defaultProps = {
  baseLayer: {
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
    baseLayerOptions: {}
  },
  center: [DEFAULT_LAT, DEFAULT_LNG],
  clusterMarkers: [],
  geoJsons: [],
  rdGeoJsons: [],
  layers: [],
  mapOptions: {},
  markers: [],
  marker: null,
  scaleControlOptions: {},
  zoomControlOptions: {},
  zoom: 11,
  isLoading: false,
  isZoomControlVisible: true,
  onClick: () => 'click',  //
  onDragEnd: () => 'dragend',
  onResizeEnd: () => 'resizeend',
  onZoomEnd: () => 'zoomend'
};

MapLeaflet.propTypes = {
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string,
    baseLayerOptions: PropTypes.shape({})
  }),
  center: PropTypes.arrayOf(PropTypes.number),
  clusterMarkers: PropTypes.arrayOf(PropTypes.shape({})),
  geoJsons: PropTypes.arrayOf(PropTypes.shape({})),
  rdGeoJsons: PropTypes.arrayOf(PropTypes.shape({})),
  getLeafletInstance: PropTypes.func.isRequired,
  brkMarkers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isZoomControlVisible: PropTypes.bool,
  mapOptions: PropTypes.shape({}),
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  marker: PropTypes.shape({}),
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    overlayOptions: PropTypes.shape({}),
    transparent: PropTypes.bool,
    url: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onResizeEnd: PropTypes.func,
  onZoomEnd: PropTypes.func,
  scaleControlOptions: PropTypes.shape({}),
  zoomControlOptions: PropTypes.shape({}),
  zoom: PropTypes.number,
  isLoading: PropTypes.bool
};

export default MapLeaflet;
