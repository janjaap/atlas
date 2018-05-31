const dataSelection = '.c-data-selection';
const homepage = '.c-homepage';
const notification = '.c-panel--warning';
const table = '.c-table';

describe('trade-register module', () => {
  describe('user should be able to navigate to the trade-register from the homepage', () => {
    it('should open the trade register', () => {
      // go to the homepage
      cy.visit('/');
      // the homepage should be visible
      cy.get(homepage).should('exist').and('be.visible');
      // check if the link is in the dom and visible
      cy.get('.c-homepage__block--vestigingen').should('exist').and('be.visible');
      // the data-selection should not exist yet
      cy.get(dataSelection).should('not.exist');
      // click on the link to go to the datasets without a specified catalogus theme
      cy.get('.c-homepage__block--vestigingen').click();
      // the homepage should not be visible anymore
      cy.get(homepage).should('not.be.visible');
      // the data selection should exist
      cy.get(dataSelection).should('exist').and('be.visible');
      // the title should contain Adressen
      cy.get('h1').contains('Vestigingen').should('exist').and('be.visible');
    });
  });

  describe('not authenticated', () => {
    beforeEach(() => {
      // go to the homepage
      cy.visit('/');
      // click on the link to go to the trade register
      cy.get('.c-homepage__block--vestigingen').click();
    });

    describe('user should not be able to view the trade register', () => {
      it('should show a notification that the user must authenticate', () => {
        // a warning notification should be shown that the user must authenticate
        cy.get(notification).should('exist').and('be.visible');
      });

      it('should not show the table with results', () => {
        // the table with results should not exist
        cy.get(table).should('not.exist').and('not.be.visible');
      });
    });
  });

  describe('authenticated', () => {
    before(() => {
      cy.login();
    });

    after(() => {
      cy.logout();
    });

    beforeEach(() => {
      cy.server();
      cy.route('/dataselectie/hr/*').as('getResults');

      // go to the homepage
      cy.visit('/');
      // click on the link to go to the trade register
      cy.get('.c-homepage__block--vestigingen').click();

      cy.wait('@getResults');
      cy.scrollTo('top');
    });

    describe('user should be able to view the trade register', () => {
      it('should not show a notification', () => {
        // a warning notification should not exist
        cy.get(notification).should('not.exist').and('not.be.visible');
      });

      it('should show the table with results', () => {
        // the table with results should exist
        cy.get(table).should('exist').and('be.visible');
      });
    });

    describe('user should be able to navigate to the trade register detail view', () => {
      it('should open the correct detail view', () => {
        cy.server();
        cy.route('/handelsregister/vestiging/*').as('getVestiging');

        cy.get('.c-table__content-row:first-child').click();

        cy.wait('@getVestiging');
        cy.get('.qa-detail').should('exist').and('be.visible');
      });
    });
  });
});
