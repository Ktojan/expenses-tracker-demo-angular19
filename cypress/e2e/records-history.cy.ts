import { initialRecords } from "../../src/app/shared/constants";

describe('Records history block', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearAllLocalStorage();
    cy.window().then((win) => win.localStorage.setItem('expenses_incomes', JSON.stringify(initialRecords)));
  });

  it('Check that localstorage has initial records', () => {
      cy.getAllLocalStorage().then((result) => {
        const fromStorage = JSON.parse(result["http://localhost:4200"]['expenses_incomes'] as string);
        expect(fromStorage).to.deep.equal(initialRecords)
        expect(fromStorage.expenses.length).to.equal(initialRecords.expenses.length)
        expect(fromStorage.incomes.length).to.equal(initialRecords.incomes.length)
      })
    })

  it('Remove last expence by button click', () => {
    cy.get(`button[data-test="remove-last-button-expenses"]`).click();
      cy.getAllLocalStorage().then((result) => {
        const fromStorage = JSON.parse(result["http://localhost:4200"]['expenses_incomes'] as string);
        expect(fromStorage.expenses.length).to.equal(initialRecords.expenses.length-1)
      })
  })
  it('Remove last income by button click', () => {
    cy.get(`button[data-test="remove-last-button-incomes"]`).click();
    cy.getAllLocalStorage().then((result) => {
      const fromStorage = JSON.parse(result["http://localhost:4200"]['expenses_incomes'] as string);
      console.log(fromStorage);
      expect(fromStorage.incomes.length).to.equal(initialRecords.incomes.length-1)
    })

  })
})
