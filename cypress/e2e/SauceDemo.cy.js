// Fichier: cypress/e2e/01_login_auth.cy.js
describe('Test A - Authentification', () => {
  beforeEach(() => cy.visit('https://www.saucedemo.com/'))

  it('Doit se connecter avec succès', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Doit afficher une erreur si user bloqué', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out')
  })
})
// Fichier: cypress/e2e/02_catalogue_filtres.cy.js
describe('Test B - Catalogue et Filtres', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    // On se connecte d'abord (étape obligatoire)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Doit trier les produits par prix (Low to High)', () => {
    // Sélectionner l'option 'lohi' (Low to High) dans le menu déroulant
    cy.get('[data-test="product-sort-container"]').select('lohi')
    
    // Vérifier que le premier produit est bien le moins cher (7.99$)
    cy.get('.inventory_item_price').first().should('contain', '7.99')
  })
})

// Fichier: cypress/e2e/04_checkout_infos.cy.js
describe('Test D - Formulaire de commande', () => {
  beforeEach(() => {
    // Setup : Login + Ajout d'un item + Aller au panier
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('Doit remplir le formulaire de livraison', () => {
    cy.get('[data-test="firstName"]').type('Jean')
    cy.get('[data-test="lastName"]').type('Dupont')
    cy.get('[data-test="postalCode"]').type('75000')
    cy.get('[data-test="continue"]').click()
    
    // Vérifier qu'on arrive sur la page "Overview"
    cy.url().should('include', '/checkout-step-two.html')
  })
})
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







