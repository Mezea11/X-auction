import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the home page', () => {
  cy.visit('/');
});

When('I click on the signup button', () => {
  cy.get(':nth-child(3) > .nav-link > .btn').click()
});

Then('the signup modal opens', () => {
  cy.get('.modal-header').should('exist')
  cy.get('.modal-title').invoke('text').then((modalTitleText) => {  
  // Check if the modal title text contains the expected term
  expect(modalTitleText.trim()).to.equal('Sign Up'); });
});

Given('that the sign up model is open', () => {
  cy.get('.modal-title').should('exist');
  
});

When('I fill in the following new user information:', () => {
  cy.get('.create-account-form > :nth-child(1)').type('test1')
  cy.get('.create-account-form > :nth-child(2)').type('test1@test1.com')
  cy.get('.create-account-form > :nth-child(3)').type('hej')
  cy.get('.create-account-form > :nth-child(4)').type('hej')
});

Then('I click the create account button in the modal', () => {
  cy.get('.create-account-form > .btn').click();
});

Then('my new account should be created successfully', () => {
    // Add assertions or API calls to check account creation (not covered in this example)
  // For example: Check for success message or verify account details in the database
  // This might involve backend API testing or checking for expected UI changes/messages
  // In a real application, you would likely need to interact with backend services or APIs
  // For simplicity, assume the success message is displayed on the dashboard
  // cy.contains('Welcome to Your Dashboard').should('be.visible');
});

Then('I should see a visual confirmation on the modal', () => {
  cy.get('.modal-body > p').should('contain', 'Signup successful!');
});