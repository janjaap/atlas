'use strict';

describe('The navigation to and away from straatbeeld', () => {
    it('goes from search results back to the same search results', () => {
        dp.navigate('KADASTRALE_SUBJECTEN');
        expect(element.all(by.css('dp-search-results-list li')).count()).toBe(0);
    });

    it('goes from a detail page back to the same detail page', () => {
        dp.navigate('KADASTRALE_SUBJECTEN', 'EMPLOYEE_PLUS');
        expect(element.all(by.css('dp-search-results-list li')).count()).toBeGreaterThan(0);
    });
});
