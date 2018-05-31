(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('highlight', highlightFactory);

    highlightFactory.$inject = [
        'L',
        '$rootScope',
        'crsService',
        'ICON_CONFIG',
        'geojson',
        'crsConverter',
        'mapConfig',
        'panning',
        'store',
        'ACTIONS',
        'clusteredMarkersConfig'
    ];

    /* eslint-disable max-params */
    function highlightFactory (
    /* eslint-enable max-params */
        L,
        $rootScope,
        crsService,
        ICON_CONFIG,
        geojson,
        crsConverter,
        mapConfig,
        panning,
        store,
        ACTIONS,
        clusteredMarkersConfig) {
        const layers = {};
        let clusteredLayer;

        return {
            initialize,
            addMarker,
            removeMarker,
            setCluster,
            clearCluster
        };

        function initialize () {
            L.Icon.Default.imagePath = 'assets';
        }

        /**
         * @param {Object} leafletMap - A Leaflet map instance
         * @param {Object} item - An object with the following properties:
         *  - id: in case of a marker this needs to be a mapping to a key of ICON_CONFIG
         *  - geometry: GeoJSON using RD coordinates
         */
        function addMarker (leafletMap, item) {
            item.geometry.crs = crsService.getRdObject();
            const layer = L.Proj.geoJson(item.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                },
                pointToLayer: function (feature, latLng) {
                    const icon = L.icon(ICON_CONFIG[item.id]),
                        rotationAngle = item.orientation || 0;

                    return L.marker(latLng, {
                        icon: icon,
                        rotationAngle: rotationAngle,
                        alt: 'Marker op de kaart'
                    });
                }
            });

            layers[item.id] = layer;

            if (item.useAutoFocus) {
                zoomToLayer(leafletMap, layer, item.geometry);
            }

            leafletMap.addLayer(layer);
        }

        function removeMarker (leafletMap, item) {
            leafletMap.removeLayer(layers[item.id]);
        }

        function setCluster (leafletMap, markers) {
            clusteredLayer = L.markerClusterGroup(clusteredMarkersConfig);

            markers.forEach(marker => {
                clusteredLayer.addLayer(
                    L.marker(marker, {
                        icon: L.icon(ICON_CONFIG.detail)
                    })
                );
            });

            if (!leafletMap.getBounds().contains(clusteredLayer.getBounds())) {
                zoomToLayer(leafletMap, clusteredLayer);
            }

            leafletMap.addLayer(clusteredLayer);
        }

        function clearCluster (leafletMap) {
            if (angular.isDefined(clusteredLayer)) {
                leafletMap.removeLayer(clusteredLayer);
            }
        }

        function zoomToLayer (leafletMap, layer, geometry) {
            if (!store.getState().map.highlight) {
                store.dispatch({
                    type: ACTIONS.MAP_HIGHLIGHT,
                    payload: true
                });
                return;
            }

            let location,
                zoomLevel;

            const bounds = layer.getBounds();
            zoomLevel = leafletMap.getBoundsZoom(bounds);

            if (!isNaN(zoomLevel)) {
                // A valid zoom level has been determined
                leafletMap.fitBounds(bounds, {
                    animate: false
                });

                location = panning.getCurrentLocation(leafletMap);
            } else if (angular.isDefined(geometry)) {
                // Set the location and zoomLevel manually
                location = crsConverter.rdToWgs84(geojson.getCenter(geometry));
                zoomLevel = Math.max(leafletMap.getZoom(), mapConfig.DEFAULT_ZOOM_HIGHLIGHT);
            }

            // this will trigger a re rendering of map layers after zooming for firefox
            $rootScope.$applyAsync(() => {
                leafletMap.eachLayer(wmsLayer => {
                    if (wmsLayer.options && wmsLayer.options.layers) {
                        const currentOpacity = L.DomUtil.getStyle(wmsLayer.getElement(), 'opacity');
                        wmsLayer.removeFrom(leafletMap);
                        wmsLayer.addTo(leafletMap);
                        wmsLayer.setOpacity(currentOpacity);
                    }
                });
            });

            store.dispatch({
                type: ACTIONS.MAP_ZOOM,
                payload: {
                    viewCenter: location,
                    zoom: zoomLevel
                }
            });
        }
    }
})();
