import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the home page", () => {
  cy.visit("/");
});

When("I click on the login button", () => {
  cy.get(":nth-child(2) > .nav-link > .btn").click();
});

Then("the login modal should open", () => {
  cy.get(".modal-content").should("be.visible");
});

When("I enter the correct user credentials", () => {
  cy.get("#username").type("kalleboll");
  cy.get("#password").type("12345").type("{enter}");
});

Then("I should be logged in", () => {
  cy.get(".modal-content").should("not.exist");
});

Then("I should be redirected to My Page", () => {
  cy.url().should("include", "/mypage");
});

When("I click on the post product button", () => {
  cy.get('[style="display: flex; flex-direction: column; align-items: center;"] > :nth-child(1) > .btn').click();
});

Then('the post product modal should open', () => {
  cy.get('#PostProductModal').should('be.visible');
});

When("I click outside the post product modal", () => {
  cy.get('#PostProductModal').click(0, 100);
});

Then('the post product modal should close', () => {
  cy.get('#PostProductModal').should("not.exist");
});

When("I click on the update product button", () => {
  cy.get('[style="display: flex; flex-direction: column; align-items: center;"] > :nth-child(2) > .btn').click();
});

Then('the update product modal should open', () => {
  cy.get('#patchProductModal').should('be.visible')
});

When("I click outside the update product modal", () => {
  cy.get('#patchProductModal').click(0, 100);
});

Then('the update product modal should close', () => {
  cy.get('#patchProductModal').should("not.exist");
});

When('I click on the change user info button', () => {
  cy.get(':nth-child(3) > .btn').click();
});

Then('the change user info modal should open', () => {
  cy.get('#editUserModal').should('be.visible')
});

When("I click outside the change user info modal", () => {
  cy.get('#editUserModal').click(0, 100);
});

Then('the modal change user info should close', () => {
  cy.get('#editUserModal').should("not.exist");
});