import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("that I am on the home page", () => {
  cy.visit("/");
});

When("I click on the login button", () => {
  cy.get(":nth-child(2) > .nav-link > .btn").click();
});

Then("the login modal opens", () => {
  cy.get(".modal-content").should("be.visible");
});

Then("I type in correct user info", () => {
  cy.get("#username").type("kalleboll");
  cy.get("#password").type("12345");
});

Then("I press the Login button", () => {
  cy.get(".login-form > .btn").click();
});

Then("I get logged in", () => {
  cy.get(".modal-content").should("not.be.visible");
});

Then("I get routed to My page", () => {
  cy.url().should("include", "./mypage/#");
});
