import DRAW_TOOL_CONFIG from '../../../../../src/map/services/draw-tool/draw-tool-config';

(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('contextMiddleware', contextMiddlewareFactory);

    contextMiddlewareFactory.$inject = ['ACTIONS'];

    function contextMiddlewareFactory (ACTIONS) {
        return function (store) {
            return function (next) {
                /* eslint-disable complexity */
                return function (action) {
                    // Straatbeeld and detail can both exist in an invisible state
                    // An invisible straatbeeld or detail determines the meaning of some events
                    // These events are thus context sensitive and therefore handled by this middleware
                    const { map, straatbeeld, detail, page } = store.getState();

                    if (action.type.id === ACTIONS.MAP_CLICK.id) {
                        if (angular.isObject(straatbeeld)) {
                            // a MAP CLICK when straatbeeld is active fetches the most nearby straatbeeld
                            action.type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
                        } else {
                            // the default action for a MAP CLICK is to show the search results for that location
                            action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
                        }
                    }

                    if (action.type.id === ACTIONS.HIDE_STRAATBEELD.id) {
                        if (angular.isObject(detail)) {
                            // Close of straatbeeld reopens the original detail page if available
                            action.type = ACTIONS.FETCH_DETAIL;
                            action.payload = detail.endpoint;
                        } else if (angular.isObject(page) && angular.isString(page.name)) {
                            action.type = ACTIONS.SHOW_PAGE;
                            action.payload = page;
                        } else {
                            // The default action is to show the search results at the location
                            action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
                            action.payload = straatbeeld.location;
                        }
                    }

                    if (map && map.drawingMode !== DRAW_TOOL_CONFIG.DRAWING_MODE.NONE) {
                        if (action.type.id === ACTIONS.MAP_ZOOM.id) {
                            action.type = Object.assign({}, action.type);
                            action.type.ignore = true;
                        }
                        if (action.type.id === ACTIONS.MAP_PAN.id) {
                            action.type = Object.assign({}, action.type);
                            action.type.ignore = true;
                        }
                    }

                    return next(action);
                };
                /* eslint-enable complexity */
            };
        };
    }
})();
