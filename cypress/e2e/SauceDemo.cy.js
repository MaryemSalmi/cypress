// Fichier: cypress/e2e/05_checkout_final.cy.js
describe('Test E - Finalisation commande', () => {
  beforeEach(() => {
    // Setup complet rapide pour arriver à la fin
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('A')
    cy.get('[data-test="lastName"]').type('B')
    cy.get('[data-test="postalCode"]').type('123')
    cy.get('[data-test="continue"]').click()
  })

  it('Doit valider la commande finale', () => {
    // Vérifier que le bouton Finish est là et cliquer
    cy.get('[data-test="finish"]').click()
    
    // Vérifier le message de succès
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
    
    // Vérifier que le panier est vide (le badge a disparu)
    cy.get('.shopping_cart_badge').should('not.exist')
  })
})