import removeMd from 'remove-markdown';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionCatalog', {
            bindings: {
                content: '<'
            },
            controller: DpDataSelectionCatalogController,
            templateUrl: 'modules/data-selection/components/views/catalog/catalog.html',
            controllerAs: 'vm'
        });

    DpDataSelectionCatalogController.$inject = ['store', '$filter'];

    function DpDataSelectionCatalogController (store, $filter) {
        const vm = this;

        const state = store.getState();
        vm.catalogFilters = state.catalogFilters;

        vm.$onChanges = function () {
            const formatMap = arrayToObject(vm.catalogFilters.formatTypes, 'id');
            const serviceMap = arrayToObject(vm.catalogFilters.serviceTypes, 'id');
            const distributionMap = arrayToObject(vm.catalogFilters.distributionTypes, 'id');

            vm.items = vm.content.map((item, index) => {
                const formats = item['dcat:distribution'].map(resource => {
                    if (resource['ams:distributionType'] === 'file') {
                        return formatMap[resource['dct:format']];
                    } else if (resource['ams:distributionType'] === 'api') {
                        return serviceMap[resource['ams:serviceType']];
                    } else {
                        return distributionMap[resource['ams:distributionType']];
                    }
                });

                return {
                    header: item['dct:title'],
                    description: removeMd(item['dct:description']),
                    modified: item['ams:sort_modified'],
                    formats: $filter('aggregate')(formats),
                    tags: item['dcat:keyword'],
                    detailEndpoint: item._links.self.href
                };
            });
        };

        sessionStorage.setItem('DCATD_LIST_REDIRECT_URL', document.location.href);
    }

    function arrayToObject (array, keyField) {
        return array.reduce((obj, item) => {
            obj[item[keyField]] = item.label;
            return obj;
        }, {});
    }
}) ();
