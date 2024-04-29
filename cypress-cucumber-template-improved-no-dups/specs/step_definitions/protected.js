import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am not logged in', () => {
  cy.visit("/faq");
  cy.get(".nav-link > .btn").contains("Log in");
});

When('I enter the URL for mypage', () => {
  cy.visit("/mypage");
});

Then('I am rerouted to the home page', () => {
  cy.location().should(loc => {
    expect(loc.href).to.eq("http://localhost:5173/");
  });
});
