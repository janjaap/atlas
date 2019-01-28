import ReactDOM from 'react-dom';

(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = ['HOMEPAGE_CONFIG', '$window', '$timeout'];

    function DpHomepageController (HOMEPAGE_CONFIG, $window, $timeout) {
        const vm = this;
        const React = $window.React;
        const render = $window.render;
        const homepageAddressBlockWrapper = $window.HomepageAddressBlockWrapper;
        let homepageAddressBlockWrapperContainer;

        vm.fetchStraatbeeldPayload = angular.merge(
            {},
            HOMEPAGE_CONFIG.PANORAMA,
            {
                isInitial: true,
                isFullscreen: false
            }
        );
        $timeout(setReactComponents);

        function setReactComponents () {
            homepageAddressBlockWrapperContainer = $window.document.querySelector('#homepage-address-block');
            if (homepageAddressBlockWrapper && homepageAddressBlockWrapperContainer) {
                render(React.createElement(homepageAddressBlockWrapper, null), homepageAddressBlockWrapperContainer);
            }
        }

        this.$onDestroy = () => {
            if (homepageAddressBlockWrapperContainer) {
                ReactDOM.unmountComponentAtNode(homepageAddressBlockWrapperContainer);
            }
        };
    }
})();
