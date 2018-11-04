(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('TAB_HEADER_CONFIG', {
            'data-datasets': {
                data: {
                    title: 'Data',
                    action: 'FETCH_SEARCH_RESULTS_BY_QUERY',
                    getPayload: query => query,
                    tip: 'maak de zoekcriteria minder specifiek (bijv. een straat i.p.v. specifiek adres)'
                },
                datasets: {
                    title: 'Datasets',
                    action: 'FETCH_DATA_SELECTION',
                    getPayload: (query) => {
                        return {dataset: 'dcatd', view: 'CATALOG', query, page: 1};
                    },
                    tip: `maak de zoekcriteria minder specifiek. Of probeer in plaats van zoeken eens de
                          optie 'Alle datasets tonen' en filter vervolgens op thema.`
                }
            }
        });
})();
