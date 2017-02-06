(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionDownloadButton', {
            bindings: {
                dataset: '@',
                activeFilters: '=',
                geoFilter: '='
            },
            templateUrl: 'modules/data-selection/components/header/download-button/download-button.html',
            controller: DpDataSelectionDownloadButtonController,
            controllerAs: 'vm'
        });

    DpDataSelectionDownloadButtonController.$inject = ['$window', '$scope', 'API_CONFIG', 'DATA_SELECTION_CONFIG'];

    function DpDataSelectionDownloadButtonController ($window, $scope, API_CONFIG, DATA_SELECTION_CONFIG) {
        let vm = this,
            filterParams = [];

        $scope.$watchGroup([
            'vm.dataset',
            'vm.activeFilters',
            'vm.geoFilter'
        ], setDownloadUrl);

        function setDownloadUrl () {
            filterParams.length = 0;

            vm.downloadUrl = API_CONFIG.ROOT + DATA_SELECTION_CONFIG.datasets[vm.dataset].ENDPOINT_EXPORT;

            DATA_SELECTION_CONFIG.datasets[vm.dataset].FILTERS.forEach(function (filter) {
                if (angular.isString(vm.activeFilters[filter.slug])) {
                    filterParams.push(filter.slug + '=' + $window.encodeURIComponent(vm.activeFilters[filter.slug]));
                }
            });

            if (angular.isArray(vm.geoFilter)) {
                filterParams.push('shape=' + angular.toJson(vm.geoFilter.map(([lat, lng]) => [lng, lat])));
            }

            if (filterParams.length) {
                vm.downloadUrl += '?' + filterParams.join('&');
            }
        }
    }
})();
