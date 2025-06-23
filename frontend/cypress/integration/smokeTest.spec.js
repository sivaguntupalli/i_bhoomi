/**
 * Smoke Tests
 * 
 * Purpose: Basic verification of critical application functionality
 * Tests Included:
 * 1. Homepage loading
 * 2. Navigation to property listings
 * 3. Language switching functionality
 * 4. Authentication flows
 * 
 * Run Command: npm run cypress:open
 * Configuration: See cypress.json
 */

describe('iBhoomi Critical Functionality Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the homepage successfully', () => {
      cy.get('h1').should('contain', 'iBhoomi');
      cy.percySnapshot('Homepage loaded'); // Visual regression
    });
  
    it('should navigate to property listings', () => {
      cy.get('[data-testid="nav-properties"]').click();
      cy.url().should('include', '/properties');
      cy.get('.property-card').should('have.length.gt', 0);
    });
  
    it('should switch language to Hindi', () => {
      cy.get('[data-testid="language-switcher"]').click();
      cy.contains('हिन्दी').click();
      cy.get('h1').should('contain', 'आपकी भूमि');
    });
  
    it('should show login form with validation', () => {
      cy.get('[data-testid="login-button"]').click();
      cy.get('form').should('exist');
      cy.get('[type="submit"]').click();
      cy.get('.error-message').should('contain', 'required');
    });
  });