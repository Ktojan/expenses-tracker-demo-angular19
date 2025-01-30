import { BasicCategories, Record } from "../../src/app/shared/constants";

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Visits the initial project page', () => {
    cy.contains('Galaxy Hitchhiker Finance Tracker');
  })
  it('Check presence of all expense categories labels', () => {
    cy.get('[data-test="expence-categories-set"]').then($el => {
      cy.wrap($el).find('b[data-test="category-chip"]').as('chips')
      cy.get('@chips').first().should('have.text', BasicCategories[Record.Exp][0]) //'Taxes, Fee'
      cy.get('@chips').eq(1).should('have.text', BasicCategories[Record.Exp][1]) //Services
      cy.get('@chips').eq(2).should('have.text', BasicCategories[Record.Exp][2]) //Presents
      cy.get('@chips').eq(3).should('have.text', BasicCategories[Record.Exp][3]) //Household
      cy.get('@chips').last().should('have.text', BasicCategories[Record.Exp][4]) //Misce
    })
  })
  it('Check presence of all incomes categories labels', () => {
    cy.get('[data-test="incomes-categories-set"]').then($el => {
      cy.wrap($el).find('b[data-test="category-chip"]').as('chips')
      cy.get('@chips').first().should('have.text', BasicCategories[Record.Inc][0]) //Planet leasing
      cy.get('@chips').eq(1).should('have.text', BasicCategories[Record.Inc][1]) //Negotiation
      cy.get('@chips').eq(2).should('have.text', BasicCategories[Record.Inc][2]) //Selling fraud
      cy.get('@chips').last().should('have.text', BasicCategories[Record.Inc][3]) //Misce
    })
  })
})
