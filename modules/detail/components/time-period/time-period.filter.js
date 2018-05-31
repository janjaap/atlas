import formatDate from '../../../../src/shared/services/date-formatter/date-formatter';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('timePeriod', timePeriodFilter);

    function timePeriodFilter () {
        return function (input) {
            if (angular.isObject(input)) {
                const startDate = input['time:hasBeginning'] && new Date(input['time:hasBeginning']);
                const endDate = input['time:hasEnd'] && new Date(input['time:hasEnd']);
                const result = startDate ? `${formatDate(startDate)} ` : '';

                return endDate ? `${result}tot ${formatDate(endDate)}` : result;
            }
        };
    }
})();
