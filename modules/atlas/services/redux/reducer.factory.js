import { combineReducers } from 'redux';

/* istanbul ignore next */
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        '$window',
        '$rootScope',
        '$timeout',
        'deprecatedReducer'
    ];

    // eslint-disable-next-line max-params
    function reducerFactory (
             $window,
             $rootScope,
             $timeout,
             deprecatedReducer
        ) {
        return function (oldState, action) { // eslint-disable-line complexity
            // Run state changes based on old reducers
            const deprecatedState = deprecatedReducer(oldState, action);

            // Use combine reducer for new reducers
            const ErrorMessageReducer = $window.reducers.ErrorMessageReducer;
            const UiReducer = $window.reducers.UiReducer;
            const UserReducer = $window.reducers.UserReducer;
            const newRootReducer = combineReducers({
                error: ErrorMessageReducer,
                ui: UiReducer,
                user: UserReducer
            });
            const filteredState = {
                error: oldState.error, // not using deprecated state because error state is lossed by URL resolver
                ui: deprecatedState.ui,
                user: deprecatedState.user
            };

            // Combine old and new reducer states
            const newState = {
                ...deprecatedState,
                ...newRootReducer(filteredState, action)
            };

            $timeout(() => $rootScope.$digest());

            return newState;
        };
    }
})();
