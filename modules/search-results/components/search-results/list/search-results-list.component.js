(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .component('dpSearchResultsList', {
            bindings: {
                category: '=',
                limitResults: '='
            },
            templateUrl: 'modules/search-results/components/search-results/list/search-results-list.html',
            controller: DpSearchResultsListController,
            controllerAs: 'vm'
        });

    function DpSearchResultsListController () {
        const STATUS_OBJECT_GEVORMD = 18;

        const vm = this;

        vm.showSubtype = function (categorySlug, link) {
            return angular.isString(link.subtype) &&
                (
                    (categorySlug === 'openbareruimte' && link.subtype !== 'weg') ||
                    (categorySlug === 'adres' && link.subtype !== 'verblijfsobject') ||
                    categorySlug === 'gebied' ||
                    categorySlug === 'explosief' ||
                    (categorySlug === 'monument' && link.subtype === 'complex')
                );
        };

        vm.getExtraInfo = function (link) {
            if (angular.isObject(link)) {
                let extraInfo = '';

                if (link.hoofdadres === false) {
                    extraInfo += ' (nevenadres)';
                }

                if (angular.isObject(link.vbo_status) && Number(link.vbo_status.code) === STATUS_OBJECT_GEVORMD) {
                    extraInfo += ` (${link.vbo_status.omschrijving.toLowerCase()})`;
                }

                return extraInfo;
            }
        };
    }
})();
