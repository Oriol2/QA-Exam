import { login } from "../../fixtures/locator";
import { data } from "../../fixtures/testData";
import { Before, When, Then } from "cypress-cucumber-preprocessor/steps";

Before({ tags: '@main_page' }, () => {
    cy.intercept(`${data.api}/entries`).as('entries');
    cy.intercept(`${data.api}/login`).as('login');
    cy.visitPage(data.url);
})

When('I login application', () => {
    cy.login(data.username, data.password);
});

When('I logout application', () => {
    cy.logout();
});

Then('{string} is successfully', (mode) => {
    if (mode==='Login') {
        cy.get(login.nameUser).should('have.text', `Welcome ${data.username}`);
    } else {
        cy.get(login.nameUser).should('have.text', '');
        cy.get(login.singup).should('exist')
    }
})