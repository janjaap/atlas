import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    httpStatusFactory.$inject = [
        '$window'
    ];

    function httpStatusFactory ($window) {
        return {
            logResponse,
            registerError
        };

        function logResponse (message, statusCode) {
            // Todo: log to sentry
            console.warn(message, statusCode); // eslint-disable-line no-console,angular/log
        }

        function registerError (errorType) {
            $window.reduxStore.dispatch(setGlobalError(errorType));
        }
    }
})();
