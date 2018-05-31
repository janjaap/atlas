(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['$q', 'STRAATBEELD_CONFIG', 'sharedConfig', 'geojson', 'api'];

    function straatbeeldApiFactory ($q, STRAATBEELD_CONFIG, sharedConfig, geojson, api) {
        const MAX_RADIUS_KM = 100; // The maximum search radius straatbeeld in KM

        let cancel; // Promise to cancel any outstanding http requests

        return {
            getImageDataByLocation,
            getImageDataById
        };

        /**
         * @param {Number[]} location The center location.
         * @param {Number} history The year to featch hotspots for, queries all
         *   years when falsy.
         * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
         */
        function getImageDataByLocation (location, history) {
            return searchWithinRadius(location, MAX_RADIUS_KM * 1000, history);
        }

        /**
         * Search for a straatbeeld.
         *
         * @param {Number[]} location The center location.
         * @param {Number} radius The distance from the location within to
         *   search for a straatbeeld.
         * @param {Number} history The year to featch hotspots for, queries all
         *   years when falsy.
         *
         * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
         */
        function searchWithinRadius (location, radius, history) {
            const endpoint = history
                ? `${STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_YEAR}${history}/`
                : STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_ALL;

            return getStraatbeeld(`${sharedConfig.API_ROOT}${endpoint}` +
                `?lat=${location[0]}&lon=${location[1]}&radius=${radius}`)
                .then(
                    data => {
                        if (data) {
                            return data;
                        } else {
                            return null;
                        }
                    }
                );
        }

        function getImageDataById (id, history) {
            const endpoint = history
                ? `${STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_YEAR}${history}/`
                : STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_ALL;

            return getStraatbeeld(`${sharedConfig.API_ROOT}${endpoint}${id}/`);
        }

        function getStraatbeeld (url) {
            if (cancel) {
                // Cancel any outstanding requests
                cancel.resolve();
            }
            cancel = $q.defer();
            return api.getByUrl(url, undefined, cancel)
                .then(imageData)
                .finally(() => cancel = null);
        }

        function imageData (response) {
            if (angular.isObject(response.geometrie)) {
                const formattedGeometrie = {
                    coordinates: [
                        response.geometrie.coordinates[1],
                        response.geometrie.coordinates[0]
                    ],
                    type: response.geometrie.type
                };

                return {
                    date: new Date(response.timestamp),
                    id: response.pano_id,
                    hotspots: response.adjacent.map(function (item) {
                        return {
                            id: item.pano_id,
                            heading: item.heading,
                            distance: item.distance,
                            year: item.year
                        };
                    }),
                    location: geojson.getCenter(formattedGeometrie),
                    image: response.image_sets.cubic
                };
            }
        }
    }
})();
