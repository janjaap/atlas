import SOURCES from '../../../src/shared/services/layers/overlays.constant';
import BASE_LAYERS from '../../../src/shared/services/layers/base-layers.constant';

(() => {
    'use strict';

    angular
        .module('dpMap')
        .factory('layers', layersFactory);

    layersFactory.$inject = ['$q', 'api', 'L', 'mapConfig'];

    function layersFactory ($q, api, L, mapConfig) {
        var baseLayer,
            wmsLayers = {};

        return {
            setBaseLayer,
            addOverlay,
            removeOverlay,
            hideOverlay,
            showOverlay
        };

        function getBaseLayerTemplate (layerName) {
            var baseLayerTemplate;

            baseLayerTemplate = BASE_LAYERS.filter(function (layer) {
                return layerName === layer.slug;
            })[0];
            return baseLayerTemplate.urlTemplate;
        }

        /*
         * @param {Object} map - A Leaflet map instance
         * @param {String} layerName - A reference to a slug from base-layers.constant.js
         */
        function setBaseLayer (leafletMap, layerName) {
            var template;

            if (leafletMap.hasLayer(baseLayer)) {
                leafletMap.removeLayer(baseLayer);
            }

            template = getBaseLayerTemplate(layerName);

            baseLayer = L.tileLayer(
                template,
                mapConfig.BASE_LAYER_OPTIONS
            );

            leafletMap.addLayer(baseLayer);
        }

        function addOverlay (leafletMap, layerName) {
            getSubLayers(leafletMap, layerName).then(layer => {
                layer.addTo(leafletMap);
                layer.setOpacity(1);
            });
        }

        function removeOverlay (leafletMap, layerName) {
            getSubLayers(leafletMap, layerName).then(layer => {
                layer.removeFrom(leafletMap);
            });
        }

        function showOverlay (leafletMap, layerName) {
            getSubLayers(leafletMap, layerName).then(layer => {
                layer.setOpacity(1);
            });
        }

        function hideOverlay (leafletMap, layerName) {
            getSubLayers(leafletMap, layerName).then(layer => {
                layer.setOpacity(0);
            });
        }

        function getSubLayers (leafletMap, overlayName) {
            const wmsLayerId = leafletMap._leaflet_id + '_' + overlayName;
            if (!SOURCES[overlayName]) {
                return $q.reject();
            }

            if (!wmsLayers[wmsLayerId]) {
                wmsLayers[wmsLayerId] = getWmsUrl(overlayName).then(wmsUrl => {
                    return L.nonTiledLayer.wms(wmsUrl, {
                        ...mapConfig.OVERLAY_OPTIONS,
                        layers: SOURCES[overlayName].layers
                    });
                });
            }

            return wmsLayers[wmsLayerId];
        }

        function getWmsUrl (overlayName) {
            const overlay = SOURCES[overlayName];
            return overlay.external ? $q.resolve(overlay.url)
                : api.createUrlWithToken(mapConfig.OVERLAY_ROOT + overlay.url);
        }
    }
})();
