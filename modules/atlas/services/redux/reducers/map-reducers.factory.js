(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('mapReducers', mapReducersFactory);

    mapReducersFactory.$inject = ['$rootScope', '$timeout', 'ACTIONS', 'DRAW_TOOL_CONFIG'];

    function mapReducersFactory ($rootScope, $timeout, ACTIONS, DRAW_TOOL_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.SHOW_MAP.id] = showMapReducer;
        reducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id] = mapAddPanoOverlayReducer;
        reducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id] = mapRemovePanoOverlayReducer;
        reducers[ACTIONS.MAP_PAN.id] = mapPanReducer;
        reducers[ACTIONS.MAP_ZOOM.id] = mapZoomReducer;
        reducers[ACTIONS.MAP_HIGHLIGHT.id] = mapHighlightReducer;
        reducers[ACTIONS.MAP_START_DRAWING.id] = mapStartDrawingReducer;
        reducers[ACTIONS.MAP_CLEAR_DRAWING.id] = mapClearDrawingReducer;
        reducers[ACTIONS.MAP_END_DRAWING.id] = mapEndDrawingReducer;

        return reducers;

        function showMapReducer (state) {
            return {
                ...state,
                ui: angular.isObject(state.ui) ? {
                    ...state.ui,
                    isMapPanelVisible: true,
                    isMapFullscreen: false
                } : state.ui
            };
        }

        /**
         * Adds a 'pano' (street view) layer according to the 'history'
         * selection in the state ('pano2016', 'pano2020', or 'pano' by default
         * for the most recent version).
         *
         * Removes any active 'pano' (street view) layer before adding the new
         * one.
         *
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function mapAddPanoOverlayReducer (state) {
            const newLayer = (state.straatbeeld && state.straatbeeld.history)
                ? `pano${state.straatbeeld.history}`
                : 'pano';

            if (state.map && state.map.overlays.filter((overlay) => overlay.id === newLayer).length === 1) {
                // Ovelay already exists
                return state;
            }

            // Remove any active 'pano' layers
            const overlays = state.map && state.map.overlays
                .filter((overlay) => !overlay.id.startsWith('pano'));

            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    overlays: [
                        ...overlays,
                        {id: newLayer, isVisible: true}
                    ]
                } : state.map
            };
        }

        /**
         * Removes any active 'pano' (street view) layer.
         *
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function mapRemovePanoOverlayReducer (state) {
            // Remove all active 'pano' layers
            const overlays = state.map && state.map.overlays
                .filter((overlay) => !overlay.id.startsWith('pano'));

            if (state.map && overlays.length === state.map.overlays.length) {
                // No 'pano' layers were active
                return state;
            }

            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    overlays
                } : state.map
            };
        }

        /**
         * @param {Object} state
         * @param {Array} payload - The new position in Array format, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function mapPanReducer (state, payload) {
            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    viewCenter: payload
                } : state.map
            };
        }

        /**
         * @param {Object} state
         * @param {Number} payload - The zoom level
         *
         * @returns {Object} newState
         */
        function mapZoomReducer (state, payload) {
            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    zoom: payload.zoom,
                    viewCenter: angular.isArray(payload.viewCenter) ? payload.viewCenter : state.map.viewCenter
                } : state.map
            };
        }

        /**
         * @param {Object} state
         * @param {Number} payload - Set hightlighting on or off
         *
         * @returns {Object} newState
         */
        function mapHighlightReducer (state, payload) {
            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    highlight: payload
                } : state.map
            };
        }

        function mapStartDrawingReducer (state, payload) {
            if (payload !== DRAW_TOOL_CONFIG.DRAWING_MODE.EDIT &&
                state.dataSelection &&
                state.dataSelection.geometryFilter &&
                state.dataSelection.geometryFilter.markers &&
                state.dataSelection.geometryFilter.markers.length > 0) {
                state = resetDataSelection(state);
            }

            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    drawingMode: payload
                } : state.map
            };
        }

        function mapClearDrawingReducer (state) {
            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    geometry: []
                } : state.map
            };
        }

        function mapEndDrawingReducer (state, payload) {
            const moreThan2Markers = payload && payload.markers && payload.markers.length > 2;

            if (moreThan2Markers) {
                state = resetDataSelection(state, payload);
            }

            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    ...getMap(state, payload)
                } : state.map,
                ui: angular.isObject(state.ui) ? {
                    ...state.ui,
                    isMapPanelVisible: moreThan2Markers ? false : state.ui.isMapPanelVisible
                } : state.ui,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: moreThan2Markers ? null : state.page.name
                } : state.page
            };
        }

        function getMap (state, payload) {
            const has2Markers = payload && payload.markers && payload.markers.length === 2,
                moreThan2Markers = payload && payload.markers && payload.markers.length > 2;

            return {
                drawingMode: DRAW_TOOL_CONFIG.DRAWING_MODE.NONE,
                geometry: has2Markers ? payload.markers : moreThan2Markers ? [] : state.map.geometry,
                isLoading: moreThan2Markers ? true : state.map.isLoading,
                isFullscreen: moreThan2Markers ? false : state.ui.isMapFullscreen
            };
        }

        function resetDataSelection (state, payload = {markers: []}) {
            return {
                ...state,
                dataSelection: {
                    ...{
                        dataset: 'bag'
                    },
                    ...state.dataSelection,
                    geometryFilter: payload,
                    page: 1,
                    isFullscreen: false,
                    isLoading: true,
                    view: 'LIST',
                    markers: [],
                    // No markers, the data selection goes back to its default state of
                    // showing all data => make sure it will not trigger a url state
                    // change
                    reset: payload.markers.length === 0
                }
            };
        }
    }
})();
