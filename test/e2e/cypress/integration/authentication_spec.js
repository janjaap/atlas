describe('auth module', () => {
  describe('authentication', () => {
    it('should be verified', () => {
      cy.login();
      cy.get('.qa-menu__title').should('contain', 'atlas.emp...');
      cy.logout();
    });
  });
});
