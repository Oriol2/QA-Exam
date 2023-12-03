import { login } from "../fixtures/locator";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// Command to navigate to https://www.demoblaze.com/ URL
Cypress.Commands.add('visitPage', (url) => {
    cy.visit(url);
});

// Command to input required login data and click on login button by text
Cypress.Commands.add('login', (username, password) => {
    cy.get(login.loginTab).click();
    cy.wait('@entries').its('response.statusCode').should('eq', 200);
    cy.get(login.username).type(username);
    cy.get(login.password).type(password);
    cy.get(login.loginTextClass).contains(login.loginText).click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
});

// Command to logout from the website
Cypress.Commands.add('logout', () => {
    cy.get(login.logoutTab).click();
    cy.wait('@entries').its('response.statusCode').should('eq', 200);
});
