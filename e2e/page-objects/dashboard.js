const mapPageObject = require('./map');
const pagePageObject = require('./page');

module.exports = function (dashboardElement) {
    return {
        leftColumn: getColumn('left'),
        middleColumn: getColumn('middle'),
        rightColumn: getColumn('right')
    };

    function getColumn (position) {
        const column = dashboardElement.element(by.css('.qa-dashboard__column--' + position));

        return function () {
            return {
                dataSelection: getComponent(column.element(by.css('.qa-data-selection'))),
                detail: getComponent(column.element(by.css('.qa-detail'))),
                layerSelection: getComponent(column.element(by.css('.qa-layer-selection'))),
                map: mapPageObject(column.element(by.css('.qa-map'))),
                page: pagePageObject(column.element(by.css('.qa-page'))),
                searchResults: getComponent(column.element(by.css('.qa-search-results'))),
                straatbeeld: getComponent(column.element(by.css('.qa-straatbeeld'))),
                columnSize: function () {
                    return column.getAttribute('class').then(function (className) {
                        if (className.match(/u-col-sm--4/) !== null) {
                            return 4;
                        } else if (className.match(/u-col-sm--8/) !== null) {
                            return 8;
                        } else if (className.match(/u-col-sm--12/) !== null) {
                            return 12;
                        } else {
                            return 0;
                        }
                    });
                }
            };

            function getComponent (component) {
                return function () {
                    return {
                        isActive: function () {
                            return component.isPresent()
                        },
                        isVisible: function () {
                            return component.getAttribute('class').then(function (className) {
                                return className.match(/ng-hide/) === null;
                            });
                        }
                    };
                };
            }
        };
    }
};
