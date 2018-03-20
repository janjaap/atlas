(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpSiteHeader', {
            bindings: {
                query: '@',
                searchAction: '<',
                hasPrintButton: '<',
                hasEmbedButton: '<',
                size: '=',
                user: '<'
            },
            templateUrl: 'modules/header/components/site-header/site-header.html',
            controller: DpSiteHeaderController,
            controllerAs: 'vm'
        });

    DpSiteHeaderController.$inject = ['$scope', 'HEADER', '$window', '$timeout'];

    function DpSiteHeaderController ($scope, HEADER, $window, $timeout) {
        const vm = this;
        const React = $window.React;
        const render = $window.render;
        const searchComponent = $window.SearchWrapper;

        $scope.$watch('vm.size', updateSize);

        function updateSize (size) {
            vm.menuSize = vm.size === HEADER.SIZE.TALL ? HEADER.SIZE.SHORT : HEADER.SIZE.TALL;
            vm.isTall = vm.size === HEADER.SIZE.TALL;
            vm.isShort = vm.size === HEADER.SIZE.SHORT;
            setSearchComponent();
        }

        function setSearchComponent () {
            $timeout(() => {
                if (!$window.document.getElementById('header-search')) {
                    const autosuggestContainer = $window.document.querySelector('.react-autosuggest-container');
                    render(React.createElement(searchComponent, null), autosuggestContainer);
                }
            });
        }
    }
})();
