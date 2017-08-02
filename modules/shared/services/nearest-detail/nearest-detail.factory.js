(() => {
    angular
        .module('dpShared')
        .factory('nearestDetail', nearestDetailFactory);

    nearestDetailFactory.$inject = ['$q', 'api', 'store', 'ACTIONS', 'mapConfig'];

    function nearestDetailFactory ($q, api, store, ACTIONS, mapConfig) {
        let detailLocation = [],
            dispatcher;

        return {
            getLocation,
            search
        };

        // public methods
        function getLocation () {
            return detailLocation;
        }

        function search (location, overlays, zoom, callback) {
            const allRequests = [];

            detailLocation = location;
            dispatcher = callback;

            overlays.reverse().forEach((overlay) => {
                const searchParams = {
                    item: overlay.detailItem,
                    lat: location[0],
                    lon: location[1]
                };

                searchParams.radius = angular.isNumber(overlay.detailFactor) ? Math.round(
                    Math.pow(2, mapConfig.BASE_LAYER_OPTIONS.maxZoom - zoom) / 2) * overlay.detailFactor : 0;

                const request = api.getByUri(overlay.detailUrl || 'geosearch/search/', searchParams).then(
                    data => data,
                    () => { return { features: [] }; });    // empty features on failure of api call

                allRequests.push(request);
            });

            return $q.all(allRequests).then(checkForDetailResults);
        }

        // non public methods
        function checkForDetailResults (newDetailResults) {
            const results = newDetailResults
                .map(i => i.features)
                .reduce((a, b) => a.concat(b))
                .map(i => i.properties);

            if (results && results.length > 0) {
                // found detail item
                store.dispatch({
                    type: ACTIONS.MAP_HIGHLIGHT,
                    payload: false
                });

                store.dispatch({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: results[0].uri
                });
            } else if (angular.isFunction(dispatcher)) {
                // not found item: do original geosearch
                dispatcher.call();
            }

            return results;
        }
    }
})();
