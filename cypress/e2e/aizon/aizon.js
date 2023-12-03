import { login, inputForm } from "../../fixtures/locator";
import { data } from "../../fixtures/testData";
import { Before, When, Then } from "cypress-cucumber-preprocessor/steps";

Before({ tags: "@api" }, () => {
  cy.intercept(`${data.api}/entries`).as("entries");
  cy.intercept(`${data.api}/login`).as("login");
  cy.intercept(`${data.api}/view`).as("view");
  cy.intercept(`${data.api}/addtocart`).as("addtocart");
  cy.intercept(`${data.api}/viewcart`).as("viewcart");
  cy.intercept(`${data.api}/deleteitem`).as("deleteitem");
});

Before({ tags: "@main_page" }, () => {
  cy.visitPage(data.url);
});

When("I login application", () => {
  cy.login(data.username, data.password);
});

When("I logout application", () => {
  cy.logout();
});

When("I click on {string} text", (text) => {
  cy.clickByText(text);
});

When("Fill input form", () => {
  cy.get(inputForm.name).type(data.name);
  cy.get(inputForm.country).type(data.country);
  cy.get(inputForm.city).type(data.city);
  cy.get(inputForm.card).type(data.card);
  cy.get(inputForm.month).type(data.month);
  cy.get(inputForm.year).type(data.year);
});

Then("{string} is successfully", (mode) => {
  if (mode === "Login") {
    cy.get(login.nameUser).should("have.text", `Welcome ${data.username}`);
  } else {
    cy.get(login.nameUser).should("have.text", "");
    cy.get(login.singup).should("exist");
  }
});

Then("Expect {string} to be loaded", (text) => {
  cy.wait("@view").then((xhr) => {
    expect(xhr.response).to.have.property("statusCode", 200);
    cy.wrap(xhr.response.body.price).as("price");
  });
  cy.verifyText(text);
});

Then("Expect {string} to be removed", (text) => {
  cy.verifyTextisRemoved(text);
});

Then("Expect {string} to be added in cart", (text) => {
  cy.wait("@addtocart").its("response.statusCode").should("eq", 200);
  cy.get(login.cartTab).click();
  cy.wait("@viewcart").its("response.statusCode").should("eq", 200);
  cy.verifyText(text);
});

Then("Expect input form", () => {
  cy.get("@price").then(($price) => {
    cy.get(inputForm.total).should("have.text", `Total: ${$price}`);
  });
});

Then("{string} message is displayed", (text) => {
  cy.verifyText(text);
});
