/* eslint-disable */
import '../support';


describe('map module', () => {
  describe('user should be able to navigate to the map from the homepage', () => {
    it('should open the map', () => {
      // go to the homepage
      cy.visit('/');
      // check if the link is in the dom and visible
      cy.get('.qa-map-link').should('exist').and('be.visible');
      // the map should not exist yet
      cy.get('.c-map').should('not.exist');
      // click on the link to go to the map
      cy.get('.qa-map-link').click();
      // the homepage should not be visible anymore
      cy.get('.c-homepage').should('not.be.visible');
      // the map should be visible
      cy.get('.c-map').should('exist').and('be.visible');
    });
  });

  describe('user should be able to interact with the map', () => {
    it('should show results based on the interaction with the map', () => {
      cy.viewport(1000, 660); // ensure the viewport is always the same in this test, so the clicks can be aligned properly
      cy.visit('/');
      cy.get('.qa-map-link').click();
      cy.get('#global-search').focus().type('dam 1');
      cy.get('.c-autocomplete').contains('Dam 1').click();
      cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').should('exist').and('be.visible').and('have.attr', 'src', 'assets/images/map/detail.svg');

      cy.checkPreviewPanel(['Dam 1', 'winkelfunctie']);

      cy.get('.qa-map-container').click(560, 293);
      cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').should('exist').and('be.visible').and('have.attr', 'src', 'assets/images/map/search.svg');
      cy.get('.map-preview-panel.map-preview-panel--visible').contains('Beursplein 2').click();
      cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').should('exist').and('be.visible');
      cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').should('exist').and('be.visible').and('have.attr', 'src', 'assets/images/map/detail.svg');
      cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
      cy.checkPreviewPanel(['Indicatie hoofdadres', 'Nee']);
      cy.get('button.map-preview-panel__button[title="Volledige weergave tonen"]').click();

      cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
      cy.get('.qa-dashboard__column--right').get('.qa-title').contains('Beursplein 2');
      cy.get('.qa-dashboard__column--right').get('dl').contains('1012JW');
      cy.get('.qa-dashboard__column--right').get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');
      cy.get('.c-panel--warning').should('exist').and('be.visible');
      cy.get('.c-panel--warning').contains('Dit is een nevenadres');
    });

    it('should remember the state when navigating back', () => {
      cy.viewport(1000, 660); // ensure the viewport is always the same in this test, so the clicks can be aligned properly

      cy.visit('/#?mpb=topografie&mpz=11&mpfs=T&mpv=52.3728007:4.899258&pgn=home&uvm=T');
      cy.get('.map-layers__category').contains('Meetbouten - Zaksnelheid').click();
      cy.get('.map-legend__zoom-level-notification').contains('Zichtbaar bij verder inzoomen').and('is.visible');
      cy.get('.leaflet-control-zoom-in').click();
      cy.wait(250);
      cy.get('.leaflet-control-zoom-in').click();
      cy.get('.map-legend__zoom-level-notification').should('not.be.visible');
      cy.get('.map-legend__items').should('exist').and('be.visible');

      cy.get('.qa-map-container').click(702, 517);

      cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
      cy.checkPreviewPanel(['Nieuwmarkt 25', '10581111']);

      cy.get('button.map-search-results__button').click();
      cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
      cy.get('.qa-dashboard__column--right').get('.qa-title').contains('10581111');
      cy.get('.qa-dashboard__column--right').get('dl').contains('Nieuwmarkt 25');
      cy.get('.qa-dashboard__column--right').get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');

      cy.get('button.toggle-fullscreen').click();

      cy.get('.qa-dashboard__column--right').should('exist').and('not.be.visible');
      cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
      cy.checkPreviewPanel(['Nieuwmarkt 25', '10581111']);

      cy.go('back');

      cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
      cy.get('.qa-dashboard__column--right').get('.qa-title').contains('10581111');
      cy.get('.qa-dashboard__column--right').get('dl').contains('Nieuwmarkt 25');
      cy.get('.qa-dashboard__column--right').get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');

      cy.go('back');

      cy.get('.qa-dashboard__column--right').should('exist').and('not.be.visible');
      cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
      cy.checkPreviewPanel(['Nieuwmarkt 25', '10581111']);
    });
  });

  describe('user should be able to use the map', () => {
    it('should render the leaflet map', () => {
      // route to the map by url
      cy.visit('/#?mpb=topografie');
      // the map container should exist
      cy.get('.c-map').should('exist').and('be.visible');
      // the leaflet map should exist
      cy.get('.s-leaflet-draw').should('exist').and('be.visible');
      // the leaflet map should exist and should contain img
      cy.get('.leaflet-tile-container').find('img').should('exist').and('be.visible');
    });

    it('should add a map-layer to the leaflet map', () => {
      // route to the map
      cy.visit('/#?mpb=topografie&mpz=11&mpfs=T&mpv=52.3731081:4.8932945&pgn=home&uvm=T');
      // get the first map-layer button
      cy.get('.map-layers__title').first().click();
      // check if the map has overlay panes
      cy.get('.leaflet-overlay-pane').children().should('exist');
      // check if there is a canvas element inside the first overlay pane
      cy.get('.leaflet-overlay-pane').find('canvas').should('exist');
    });
  });

  describe('user should be able to open the map panel when collapsed', () => {
    it('should add open the map panel component', () => {
      // route to the map
      cy.visit('/#?mpb=topografie');
      // the map-panel should have the class collapsed
      cy.get('.map-panel').should('have.class', 'map-panel--collapsed');
      // the scroll wrapper should not be visible when map panel is collapsed
      cy.get('.scroll-wrapper').should('not.be.visible');
      // expand the map-panel
      cy.get('.map-panel__toggle').click();
      // the map panel should have the class expanded
      cy.get('.map-panel').should('have.class', 'map-panel--expanded');
      // the scroll wrapper should be visible when map panel is expanded
      cy.get('.scroll-wrapper').should('exist').and('be.visible');
    });
  });
});
