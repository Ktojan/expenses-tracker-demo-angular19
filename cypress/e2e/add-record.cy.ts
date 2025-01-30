import { BasicCategories, Record } from "../../src/app/shared/constants";

const expense711 = {
  "name": "seven-eleven",
  "amount": 11,
  "category": BasicCategories[Record.Exp][2],
  "date": new Date()
}
const income55 = {
  "name": "Selling iPhone 55",
  "amount": 55000,
  "category": BasicCategories[Record.Inc][2],
  "date": new Date()
}
describe('Records history block', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check adding new expense record via form ', () => {
    cy.get('#formly_5_input_name_0').type(expense711.name, {force: true});
    cy.get('#formly_5_input_amount_1').clear({force: true}).type(String(expense711.amount), {force: true});
    // cy.get('#formly_5_select_category_2').select(expense711.category, {force: true});
    cy.get(`button[data-test="add-button-expenses"]`).click();
    cy.get('table[data-test="table-expenses"]').get('tr').eq(1).get('td').eq(0).should('have.text', expense711.name);
    cy.get('table[data-test="table-expenses"]').get('tr').eq(1).get('td').eq(1).should('have.text', expense711.category);
    cy.get('table[data-test="table-expenses"]').get('tr').eq(1).get('td').eq(3).should('have.text', expense711.amount);
  });

  it('Check updating balance after adding new expense', () => {
    let startSum: number, endSum: number;
    cy.get('#balance-sum').should(($sum) => {
       startSum = Number($sum.text().slice(1));
      });
    cy.get('#formly_5_input_name_0').type(expense711.name, {force: true});
    cy.get('#formly_5_input_amount_1').clear({force: true}).type(String(expense711.amount), {force: true});
    cy.get(`button[data-test="add-button-expenses"]`).click();
    cy.get('#balance-sum').should(($sum) => {
      endSum = Number($sum.text().slice(1));
      expect(Math.round(endSum) + expense711.amount).to.eql(Math.round(startSum))
     });
  })

  it('Check adding new income record via form', () => {
    cy.get('#formly_10_input_name_0').type(income55.name, {force: true});
    cy.get('#formly_10_input_amount_1').clear({force: true}).type(String(income55.amount), {force: true});
    // cy.get('#formly_10_select_category_2').select(income55.category, {force: true});
    cy.get(`button[data-test="add-button-incomes"]`).click();
    cy.get('table[data-test="table-incomes"] tr:nth-child(1) td:first-child').should('have.text', income55.name);
    cy.get('table[data-test="table-incomes"] tr:nth-child(1) td:nth-child(2)').should('have.text', income55.category);
    cy.get('table[data-test="table-incomes"] tr:nth-child(1) td:nth-child(4)').should('have.text', income55.amount);
  })

  it('Check updating balance after adding new income', () => {
    let startSum: number, endSum: number;
    cy.get('#balance-sum').should(($sum) => {
       startSum = Number($sum.text().slice(1));
      });
    cy.get('#formly_10_input_name_0').type(income55.name, {force: true});
    cy.get('#formly_10_input_amount_1').clear({force: true}).type(String(income55.amount), {force: true});
    cy.get(`button[data-test="add-button-incomes"]`).click();
    cy.get('#balance-sum').should(($sum) => {
      endSum = Number($sum.text().slice(1));
      expect(Math.round(endSum) - income55.amount).to.eql(Math.round(startSum))
     });
  })

})
