const datasetsTab = '.o-tabs__tab--link';
const datasetsCard = '.c-data-selection-catalog__item';

describe('datasets search module', () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  describe('user should be able to search and see results', () => {
    it('should open the datasets results', () => {
      cy.server();
      cy.defineSearchRoutes();

      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
      cy.get('.auto-suggest__input').type('Park');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();

      cy.get(datasetsTab).contains('Datasets').click();
      cy.get(datasetsCard).should('exist').and('be.visible');
    });

    it('should not open the datasets results because there are no results', () => {
      cy.server();
      cy.defineSearchRoutes();

      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
      cy.get('.auto-suggest__input').type('NORESULTS');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();

      cy.get(datasetsTab).should('not.exist').and('not.be.visible');
      cy.get(datasetsCard).should('not.exist').and('not.be.visible');
    });
  });
});
