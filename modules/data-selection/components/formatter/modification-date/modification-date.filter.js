(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('modificationDate', modificationDateFilter);

    function modificationDateFilter () {
        return function (input) {
            if (angular.isString(input)) {
                const last = new Date(input);
                const now = new Date();

                let ago = now - last;
                const daysToMiliseconds = 1000 * 60 * 60 * 24;

                if (ago >= 2 * length) {
                    ago = Math.floor(ago / daysToMiliseconds);
                    ago = (ago === 0) ? 'vandaag' : (ago === 1) ? 'gisteren' : `${ago} dagen geleden`;
                } else {
                    ago = 'in de toekomst';
                }

                return `${ago} gewijzigd`;
            }
        };
    }
})();
