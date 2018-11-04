(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('aggregate', aggregateFilter);

    function aggregateFilter () {
        /** Creates an array with distinct values and its count */
        return function (input) {
            const result = input.reduce((aggregation, value) => {
                const counter = aggregation.find(item => item.name === value);

                if (counter) {
                    counter.count++;
                } else {
                    aggregation.push({
                        name: value,
                        count: 1
                    });
                }

                return aggregation;
            }, []);

            return result.sort((a, b) => {
                if (a.count === b.count) {
                    return a.name && b.name ? a.name.localeCompare(b.name) : -1;
                } else {
                    return b.count - a.count;
                }
            });
        };
    }
})();
