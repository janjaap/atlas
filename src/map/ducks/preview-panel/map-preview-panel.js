const MAXIMIZE_MAP_PREVIEW_PANEL = 'MAXIMIZE_MAP_PREVIEW_PANEL';
const OPEN_MAP_PREVIEW_PANEL = 'OPEN_MAP_PREVIEW_PANEL';
const CLOSE_MAP_PREVIEW_PANEL = 'CLOSE_MAP_PREVIEW_PANEL';

const initialState = {};

export default function MapPreviewPanelReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: true
      };

    case CLOSE_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: false
      };

    case MAXIMIZE_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: false,
        ui: {
          ...state.ui,
          isMapFullscreen: false
        }
      };

    default:
      return state;
  }
}

export const openMapPreviewPanel = () => ({ type: OPEN_MAP_PREVIEW_PANEL });
export const closeMapPreviewPanel = () => ({ type: CLOSE_MAP_PREVIEW_PANEL });
export const maximizeMapPreviewPanel = () => ({ type: MAXIMIZE_MAP_PREVIEW_PANEL });

window.reducers = window.reducers || {};
window.reducers.MapPreviewPanelReducer = MapPreviewPanelReducer;
