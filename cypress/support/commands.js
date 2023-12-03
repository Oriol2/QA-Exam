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
Cypress.Commands.add("visitPage", (url) => {
  cy.visit(url);
});

// Command to input required login data and click on login button by text
Cypress.Commands.add("login", (username, password) => {
  cy.get(login.loginTab).click();
  cy.wait("@entries").its("response.statusCode").should("eq", 200);
  // Use force:true since cypress loads to fast that it does not have time to type
  // Not the correct way
  cy.get(login.username).should("be.visible").type(username, { force: true });
  cy.get(login.password).should("be.visible").type(password, { force: true });
  cy.get(login.loginTextClass).contains(login.loginText).click();
  cy.wait("@login").its("response.statusCode").should("eq", 200);
});

// Command to logout from the website
Cypress.Commands.add("logout", () => {
  cy.get(login.logoutTab).should("be.visible").click();
  cy.wait("@entries").its("response.statusCode").should("eq", 200);
});

// Command to click by given text
Cypress.Commands.add("clickByText", (text) => {
  cy.contains(text).click();
});

// Command to expect text in page
Cypress.Commands.add("verifyText", (text) => {
  cy.contains(text).should("be.visible");
});

// Command to expect text is removed
Cypress.Commands.add("verifyTextisRemoved", (text) => {
  cy.wait("@deleteitem").its("response.statusCode").should("eq", 200);
  cy.contains(text).should("not.exist");
});
