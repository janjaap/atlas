(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            bindings: {
                className: '@',
                inline: '@',
                hoverText: '@',
                type: '@',
                payload: '<'
            },
            controller: DpLinkController,
            controllerAs: 'vm'
        });

    DpLinkController.$inject = ['$scope', 'store', 'ACTIONS', 'applicationState'];

    function DpLinkController ($scope, store, ACTIONS, applicationState) {
        const vm = this;

        const BUTTON = 'button',
            LINK = 'a';

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.inline = vm.inline || false;

        $scope.$watch('vm.payload', function () {
            vm.tagName = getTagName(vm.type, vm.payload);
        });

        vm.dispatch = function () {
            store.dispatch(getAction(vm.type, vm.payload));
        };

        function getAction (type, payload) {
            const action = {
                type: ACTIONS[type] || type
            };
            if (angular.isDefined(payload)) {
                action.payload = payload;
            }
            return action;
        }

        function getTagName (type, payload) {
            if (ACTIONS[type] && ACTIONS[type].isButton) {
                return BUTTON;
            } else {
                vm.href = getHref(type, payload);
                // Do not catch a click event and handle the state change
                // internally, this prevents users from CTRL/CMD clicking!
                return LINK;
            }
        }

        function getHref (type, payload) {
            // Remove state properties that do not relate to the url
            // by converting the state to a url and back
            // This prevents deep copying of large state objects in the reducer (eg dataSelection.markers)
            const reducer = applicationState.getReducer(),
                state = applicationState.getStore().getState(),
                params = applicationState.getStateUrlConverter().state2params(state),
                sourceState = applicationState.getStateUrlConverter().params2state({}, params),
                targetState = reducer(sourceState, getAction(type, payload));

            return applicationState.getStateUrlConverter().state2url(targetState);
        }
    }
})();
