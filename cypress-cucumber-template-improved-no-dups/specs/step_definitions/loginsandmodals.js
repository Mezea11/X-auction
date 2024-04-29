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

When("I type in correct user info", () => {
  cy.get("#username").type("kalleboll");
  cy.get("#password").type("12345").type("{enter}");
});

Then("I get logged in", () => {
  cy.get(".modal-content").should("not.exist"); // Ensure the modal is not present
});

Then("I get routed to My page", () => {
  cy.url().should("include", "/mypage");
});

Then("I click on the post product button", () => {
cy.get('[style="display: flex; flex-direction: column; align-items: center;"] > :nth-child(1) > .btn').click();
});

Then("I click outside the post product modal", () => {
  cy.get('#PostProductModal').click(0, 100);
});

Then("I click on the Update Product button", () => {
  cy.get('[style="display: flex; flex-direction: column; align-items: center;"] > :nth-child(2) > .btn').click();
});

Then("I click outside the Update Product modal", () => {
  cy.get('#patchProductModal').click(0, 100);
});

Then("I click on the Change user info button", () => {
  cy.get(':nth-child(3) > .btn').click();
});

Then("I click outside the Change user info modal", () => {
  cy.get('#editUserModal').click(0, 100);
});