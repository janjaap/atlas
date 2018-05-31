(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('searchFormatter', searchFormatterFactory);

    searchFormatterFactory.$inject = ['$injector', 'SEARCH_CONFIG'];

    function searchFormatterFactory ($injector, SEARCH_CONFIG) {
        let injectedStore;

        return {
            formatCategories: formatCategories,
            formatCategory: formatCategory,
            formatLinks: formatLinks
        };

        function getStore () {
            injectedStore = injectedStore || $injector.get('store');
            return injectedStore;
        }

        function formatCategories (allSearchResults) {
            const { user } = getStore().getState();

            return allSearchResults
                .map(function (endpointSearchResults, index) {
                    return formatCategory(SEARCH_CONFIG.QUERY_ENDPOINTS.filter((endpoint) => {
                        return !endpoint.authScope || user.scopes.includes(endpoint.authScope);
                    })[index].slug, endpointSearchResults);
                });
        }

        function formatCategory (slug, endpointSearchResults) {
            const endpointConfig = SEARCH_CONFIG.QUERY_ENDPOINTS.filter(endpoint => endpoint.slug === slug)[0],
                links = angular.isObject(endpointSearchResults) && endpointSearchResults.results || [];

            return {
                label_singular: endpointConfig.label_singular,
                label_plural: endpointConfig.label_plural,
                slug: endpointConfig.slug,
                count: angular.isObject(endpointSearchResults) && endpointSearchResults.count || 0,
                results: formatLinks(slug, links),
                useIndenting: false,
                authScope: endpointConfig.authScope || null,
                next: angular.isObject(endpointSearchResults) &&
                endpointSearchResults._links &&
                endpointSearchResults._links.next.href || null
            };
        }

        function formatLinks (slug, links) {
            const endpointConfig = SEARCH_CONFIG.QUERY_ENDPOINTS.filter(endpoint => endpoint.slug === slug)[0];

            return links.map(function (item) {
                const subtype = item.subtype || null;
                let subtypeLabel = subtype;

                if (item.subtype && endpointConfig.subtypes) {
                    subtypeLabel = endpointConfig.subtypes[item.subtype] || item.subtype;
                }

                return {
                    label: formatLabel(item),
                    hoofdadres: item.hoofdadres,
                    vbo_status: angular.isArray(item.vbo_status) ? item.vbo_status[0] : item.vbo_status,
                    endpoint: item._links.self.href,
                    subtype,
                    subtypeLabel
                };
            });
        }

        function formatLabel (item) {
            let label = item._display;

            if (item.type === 'gebied') {
                label = item.naam;
            } else if (item.type === 'bouwblok') {
                label = item.code;
            }

            return label;
        }
    }
})();
