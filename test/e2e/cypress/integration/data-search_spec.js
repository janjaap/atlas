const notification = '.c-panel--danger';

describe('data search module', () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  it.skip('user should see suggestions', () => {
    // TODO: enable this test once fetch is fully supported by Cypress
    // this test now fails because we send the auth headers in the fetch call
    // https://github.com/cypress-io/cypress/issues/95

    // open the autocomplete panel and select the first dataset option and route the correct address
    cy.server();

    cy.route('/typeahead?q=Park').as('getResults');
    cy.route('/bag/openbareruimte/*').as('getItem');

    cy.visit('/');
    cy.get('#auto-suggest__input').focus().type('Dam');

    cy.wait('@getResults');
    cy.get('.auto-suggest').should('exist').and('be.visible');
    cy.get('h4').contains('Straatnamen').siblings('ul').children('li')
      .first()
      .children()
      .first()
      .then(($el) => {
        const firstValue = $el[0].innerText;
        cy.get('h4').contains('Straatnamen').siblings('ul').children('li').first().click();
        cy.wait('@getItem');
        cy.get('.o-header__title').contains(firstValue).should('exist').and('be.visible');
      });
  });

  it.skip('should open the address catalogus', () => {
    // TODO: enable this test once fetch is fully supported by Cypress
    // this test now fails because we send the auth headers in the fetch call
    // https://github.com/cypress-io/cypress/issues/95
    cy.server();
    cy.defineGeoSearchRoutes();

    cy.route('/typeahead?q=Ad+Windighof+2').as('getResults');
    cy.route('/bag/verblijfsobject/*').as('getVerblijfsobject');
    cy.route('/panorama/thumbnail/*').as('getPanoThumbnail');
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding');

    // ensure the viewport is always the same in this test, so the clicks can be aligned properly
    cy.viewport(1000, 660);
    cy.visit('/');
    // type in search and click on autosuggest item
    cy.get('#auto-suggest__input').focus().type('Ad Windighof 2');

    cy.wait('@getResults');
    cy.get('.auto-suggest').contains('Ad Windighof 2').click();

    // check that the large right column is visible and shows the correct data
    cy.wait('@getVerblijfsobject');
    cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
    cy.get('.qa-dashboard__column--right').get('.qa-title span')
      .contains('Ad Windighof 2')
      .and('have.css', 'font-style')
      .and('match', /italic/);
    cy.get('.qa-dashboard__column--right').get('dl').contains('1087HE');

    cy.wait('@getPanoThumbnail');
    cy.get('.qa-dashboard__column--right')
      .get('img.c-straatbeeld-thumbnail--img')
      .should('exist').and('be.visible');
    cy.get(notification)
      .contains('Status: Verblijfsobject gevormd')
      .should('exist').and('be.visible');

    // click in map (there is a marker on this position)
    cy.get('.qa-map-container').click(166, 304);

    // check link in right column and click on it
    cy.waitForGeoSearch();
    cy.get('.c-search-results__block-content')
      .contains('Ad Windighof 2')
      .should('exist').and('be.visible')
      .click();

    // check that the large right column is visible and shows the correct data
    cy.wait('@getNummeraanduiding');
    cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
    cy.get('.qa-dashboard__column--right')
      .get('.qa-title span')
      .contains('Ad Windighof 2')
      .and('have.css', 'font-style')
      .and('match', /italic/);
    cy.get('.qa-dashboard__column--right').get('dl').contains('1087HE');
    cy.get('.qa-dashboard__column--right')
      .get('img.c-straatbeeld-thumbnail--img')
      .should('exist').and('be.visible');

    cy.get('button.toggle-fullscreen').click();

    // check that the previewpanel is visible and shows the correct data
    cy.get('.qa-dashboard__column--right').should('exist').and('not.be.visible');
    cy.get('.map-preview-panel.map-preview-panel--visible')
      .get('img.map-detail-result__header-pano')
      .should('exist').and('be.visible');
    // helper function to check values in previewpanel
    cy.checkPreviewPanel(['Ad Windighof 2', 'Verblijfsobject gevormd']);
    cy.get(notification).should('not.exist').and('not.be.visible');
  });

  describe('user should be able to submit', () => {
    beforeEach(() => {
      cy.server();
      cy.defineSearchRoutes();
      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
    });

    it('should submit the search and give results', () => {
      cy.get('.auto-suggest__input').type('Park');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();
      cy.get('.o-list').should('exist').and('be.visible');
    });

    it('should submit the search and give no results', () => {
      cy.get('.auto-suggest__input').type('NORESULTS');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();
      cy.get('.o-list').should('have.length', 0);
    });
  });
});
