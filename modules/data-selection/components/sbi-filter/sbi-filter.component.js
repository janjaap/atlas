(() => {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpSbiFilter', {
            bindings: {
                availableFilters: '=',
                activeFilters: '='
            },
            templateUrl: 'modules/data-selection/components/sbi-filter/sbi-filter.html',
            controller: DpSbiFilterController,
            controllerAs: 'vm'
        });

    DpSbiFilterController.$inject = ['$scope', 'store', 'ACTIONS'];

    function DpSbiFilterController ($scope, store, ACTIONS) {
        const vm = this,
            sbiLevelFilters = vm.availableFilters.filter(filter => filter.slug.startsWith('sbi_l')),
            numberOfOptions = sbiLevelFilters
                .reduce((total, amount) => total + amount.numberOfOptions, 0),
            options = sbiLevelFilters
                .map(filter => {
                    return filter.options.map(sub => ({
                        ...sub,
                        slug: filter.slug
                    }));
                })
                .reduce((a, b) => a.concat(b), [])
                .slice(0, 100);

        vm.sbiCode = vm.activeFilters.sbi_code && vm.activeFilters.sbi_code.replace(/['\[\]]/g, '');
        vm.showMoreThreshold = 10;
        vm.isExpanded = false;
        vm.filterSlug = 'sbi_code';

        vm.filter = {
            ...vm.availableFilters.find(filter => filter.slug === 'sbi_code'),
            options,
            numberOfOptions
        };

        vm.onSubmit = () => {
            vm.addFilter(vm.sbiCode);
        };

        vm.addFilter = (value) => {
            const filters = {...vm.activeFilters},
                formattedValue = value.split(',').map(data => `'${data.trim()}'`).join(', ');

            if (value === '') {
                delete filters[vm.filterSlug];
            } else {
                filters[vm.filterSlug] = `[${formattedValue}]`;
            }

            applyFilters(filters);
        };

        vm.clickFilter = (string) => {
            vm.addFilter(string.replace(/: .*$/g, ''));
        };

        vm.showExpandButton = function () {
            return !vm.isExpanded && vm.canExpandImplode();
        };

        vm.nrHiddenOptions = function (filter) {
            return filter.numberOfOptions - filter.options.length;
        };

        vm.expandFilter = function () {
            vm.isExpanded = true;
        };

        vm.implodeFilter = function () {
            vm.isExpanded = false;
        };

        vm.canExpandImplode = function () {
            return vm.filter.options.length > vm.showMoreThreshold;
        };

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.APPLY_FILTERS,
                payload: filters
            });
        }
    }
})();
