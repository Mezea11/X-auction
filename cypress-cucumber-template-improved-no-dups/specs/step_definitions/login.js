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

// Wrong user info
Then("I type in incorrect user info", () => {
  cy.get("#username").type("48645");
  cy.get("#password").type("456898");
});

When("I press the Login button", () => {
  cy.get(".login-form > .btn").click();
});

When("Incorrect username or password. Please try again.", () => {
  cy.get("#alert-message").should("be.visible");
});

Then("I clear the form", () => {
  cy.get("#username").clear(); // Clear the username field
  cy.get("#password").clear(); // Clear the password field
});

When("I type in correct user info", () => {
  cy.get("#username").type("kalleboll");
  cy.get("#password").type("12345").type("{enter}");
});

Then("I get logged in", () => {
  cy.get(".modal-content").should("not.be.visible");
});

Then("I get routed to My page", () => {
  cy.url().should("include", "./mypage/#");
});
