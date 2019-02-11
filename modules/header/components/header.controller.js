import { hasPrintMode, isMapActive } from '../../../src/shared/ducks/ui/ui';

(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['store'];

    function HeaderController (store) {
        const vm = this;

        store.subscribe(update);
        update();

        function update () {
            const state = store.getState();

            vm.hasPrintButton = hasPrintMode(state);
            vm.hasEmbedButton = isMapActive(state);
        }
    }
})();