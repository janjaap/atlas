(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('search', searchFactory);

    searchFactory.$inject = ['$injector', '$q', 'SEARCH_CONFIG', 'api', 'searchFormatter', 'TabHeader'];

    function searchFactory ($injector, $q, SEARCH_CONFIG, api, searchFormatter, TabHeader) {
        let store;

        return {
            search,
            loadMore,
            initialize
        };

        function initialize () {
            TabHeader.provideCounter('FETCH_SEARCH_RESULTS_BY_QUERY', searchCount);
        }

        function getStore () {
            store = store || $injector.get('store');
        }

        function searchCount (payload) {
            return search(payload).then(results => results.reduce((count, current) => count + current.count, 0));
        }

        function search (query, categorySlug) {
            getStore();

            const queries = [];
            const params = { q: query };
            const user = store.getState().user;

            SEARCH_CONFIG.QUERY_ENDPOINTS.forEach(function (endpoint) {
                if ((!angular.isString(categorySlug) || categorySlug === endpoint.slug) &&
                    endpoint.uri &&
                    (!endpoint.authScope || user.scopes.includes(endpoint.authScope))
                ) {
                    const options = endpoint.options || {};
                    queries.push(
                        api.getByUri(
                            endpoint.uri,
                            { ...params, ...options }
                        ).then(data => data, () => [])
                    );
                }
            });

            if (angular.isString(categorySlug)) {
                // A single category
                return $q.all(queries).then(function (searchResults) {
                    return [searchFormatter.formatCategory(categorySlug, searchResults[0])];
                });
            } else {
                // All search results
                return $q.all(queries).then(searchFormatter.formatCategories);
            }
        }

        function loadMore (category) {
            getStore();
            return api.getByUrl(category.next)
                .then(function (nextPageData) {
                    // Don't change the input, create a new variable
                    var output = {};

                    output.slug = category.slug;
                    output.count = nextPageData.count;
                    output.results = category.results.concat(
                        searchFormatter.formatLinks(category.slug, nextPageData.results)
                    );

                    if (output.count > output.results.length) {
                        output.next = nextPageData._links.next.href;
                    } else {
                        output.next = null;
                    }

                    return output;
                });
        }
    }
})();
