/// <reference types="cypress" />

describe('', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000`)
  })

  it('should display the navigation bar', () => {
    cy.get('nav a').should('have.length', 2)

    cy.get('nav a').first().should('have.text', 'Login')
    cy.get('nav a').last().should('have.text', 'Register')
  })
})