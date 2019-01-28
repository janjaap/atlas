import BOUNDING_BOX from './bounding-box.constant';
import ENVIRONMENT, { ENVIRONMENTS } from '../../shared/environment';
import getCrs from './crs-service';

const BOUNDS = [
  BOUNDING_BOX.COORDINATES.southWest,
  BOUNDING_BOX.COORDINATES.northEast
];

const defaultConfig = {
  BASE_LAYER_OPTIONS: {
    tms: true,
    minZoom: 8,
    maxZoom: 16,
    bounds: BOUNDS
  },
  MAP_OPTIONS: {
    crs: getCrs(),
    maxBounds: BOUNDS,
    // 1.0 makes the bounds fully solid, preventing the user from dragging outside the bounds
    maxBoundsViscosity: 1.0,
    bounceAtZoomLimits: false,
    attributionControl: false,
    zoomControl: false
  },
  OVERLAY_OPTIONS: {
    identify: false,
    format: 'image/png',
    transparent: true
  },
  SCALE_OPTIONS: {
    position: 'bottomright',
    metric: true,
    imperial: false
  },
  ZOOM_OPTIONS: {
    position: 'bottomright',
    zoomInTitle: 'Inzoomen',
    zoomOutTitle: 'Uitzoomen'
  },
  DEFAULT_ZOOM_HIGHLIGHT: 14
};


const environmentConfig = {
  [ENVIRONMENTS.PRODUCTION]: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['t1', 't2', 't3', 't4']
    },
    OVERLAY_ROOT: 'https://map.data.amsterdam.nl/'
  },
  [ENVIRONMENTS.PRE_PRODUCTION]: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['t1', 't2', 't3', 't4']
    },
    OVERLAY_ROOT: 'https://map.data.amsterdam.nl/'
  },
  [ENVIRONMENTS.ACCEPTANCE]: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4']
    },
    OVERLAY_ROOT: 'https://acc.map.data.amsterdam.nl/'
  },
  [ENVIRONMENTS.DEVELOPMENT]: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4']
    },
    OVERLAY_ROOT: 'https://acc.map.data.amsterdam.nl/'
  }
};

const MAP_CONFIG = {
  ...defaultConfig,
  BASE_LAYER_OPTIONS: {
    ...defaultConfig.BASE_LAYER_OPTIONS,
    ...environmentConfig[ENVIRONMENT].BASE_LAYER_OPTIONS
  },
  OVERLAY_ROOT: environmentConfig[ENVIRONMENT].OVERLAY_ROOT
};

export default MAP_CONFIG;
