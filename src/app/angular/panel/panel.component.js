import angular from 'angular';
angular
    .module('dpAtlas')
    .component('dpPanel', {
        bindings: {
            isPanelVisible: '<',
            size: '@',
            type: '@',
            canClose: '=',
            className: '@',
            closeAction: '&'
        },
        transclude: true,
        template: require('./panel.html'),
        controller: DpPanelController,
        controllerAs: 'vm'
    });

// size:
// Small (less padding, no marging)
// Tiny (just to fit some words)
//
// type :
// Danger (rode vormgeving)
// Warning (blauwe vormgeving)
// Default (grijze vormgeving) als niet wordt toegevoegd

function DpPanelController() {
    var vm = this;
    vm.sizeClass = vm.size ? `c-panel--${vm.size}` : '';
    vm.typeClass = vm.type ? `c-panel--${vm.type}` : '';

    vm.close = function () {
        vm.isPanelVisible = false;
        vm.closeAction && vm.closeAction(); // eslint-disable-line no-unused-expressions
    };
}
