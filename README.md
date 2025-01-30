# ExpensesTrackerDemoAngular19

This is my demo Angular project of expences-incomes tracker for a possible "Galaxy traveller" (thanks to Douglas Adams). Implemented in January 2025.

Business logic in brief:
- Angular latest version
- User should be able to add expenses and incomes, view balance, and filter records.
- User can add records for income and expenses through a form (Name, Amount, Category, Date)
- All data must be stored in localStorage so that records persist after a page reload.
- Readable and understandable names of variables, classes, functions and methods

## Development server

Run `npm install`, then `npm start` (Node >= 16) for a dev server. Navigate to `http://localhost:4200/`. 

## Running end-to-end tests

For end-to-end (e2e) testing run:

```bash
npx cypress open
```
or
```bash
ng e2e
```

