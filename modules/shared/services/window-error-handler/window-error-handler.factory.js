import { ERROR_TYPES } from '../../../../src/shared/ducks/error-message';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('windowErrorHandler', windowErrorHandlerFactory);

    windowErrorHandlerFactory.inject = [
        '$log',
        '$rootScope',
        '$window',
        'httpStatus',
        'Raven'];

    function windowErrorHandlerFactory (
        $log,
        $rootScope,
        $window,
        httpStatus,
        Raven
    ) {
        return () => {
            $window.addEventListener('error', function (event) {
                // Initiated by browser without Raven/Sentry intervening.
                // Fired when asset load from HTML fails.
                // e.g. Piwik fails to load, or a tile is not loaded.
                // One of the causes for this may be that the connection is dropped.

                // not fired on exceptions
                // not fired on syntax error inside Angular
                // not fired on 403, 404 or 500
                let message = event.message || 'window error event';
                if (event.target && event.target.src) {
                    // URL load error
                    if (event.target.src === 'https://piwik.data.amsterdam.nl/piwik.js') {
                        $log.error('piwik load error', event);
                        return; // Don't log error in Sentry and don't set error state
                    }

                    // Notify our application of error
                    message += `, HTTP external request error, src: ${event.target.src}`;
                    $rootScope.$applyAsync(() => {
                        httpStatus.registerError(ERROR_TYPES.GENERAL_ERROR);
                    });
                }

                // Log exception in Sentry, use error object if available
                if (event.error) {
                    Raven.captureException(event.error, {
                        extra: { message }
                    });
                } else {
                    httpStatus.logResponse(message);
                }
            }, true);
        };
    }
})();
