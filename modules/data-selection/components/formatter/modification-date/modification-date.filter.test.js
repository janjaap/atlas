describe('The modification-date filter', function () {
    'use strict';

    var modDateFilter;

    beforeEach(function () {
        angular.mock.module('dpDataSelection');

        angular.mock.inject(function ($filter) {
            modDateFilter = $filter('modificationDate');
        });

        var baseTime = new Date('2018-10-05');
        jasmine.clock().mockDate(baseTime);
    });

    it('expects an object with two dates as input', function () {
        expect(modDateFilter()).toBeUndefined();
    });

    it('shows the time as since created: today / 0 days', function () {
        expect(modDateFilter('2018-10-05')).toBe('vandaag gewijzigd');
    });

    it('shows the time as since created: yesterday / 1 days', function () {
        expect(modDateFilter('2018-10-04')).toBe('gisteren gewijzigd');
    });

    it('shows the time as since created: 4 days', function () {
        expect(modDateFilter('2018-10-01')).toBe('4 dagen geleden gewijzigd');
    });

    it('shows the time as since created: future time', function () {
        expect(modDateFilter('2018-11-04')).toBe('in de toekomst gewijzigd');
    });
});
