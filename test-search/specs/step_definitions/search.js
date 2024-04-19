import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// test going from home page to search page
Given('that I am on the home page', () => {
    cy.visit('/');
});

When('I click on the search button', () => {
    cy.get('.searchbar-container > .btn').click();
});

Then('I get redirected to the search page', () => {
    cy.url().should('include', '/searchPage');
});

// test to search for something
Given('that I am on the search page', () => {
    cy.url().should('include', '/searchPage');
});

When('I write something in the search bar', () => {
    cy.get('.form-control').type('bazz');
});

When('click on the search button', () => {
    cy.get('.d-flex > .btn').click();
});

Then('I get user feedback on my search result', () => {
    cy.get('p').should('exist');
});

/*
Then('get user feedback on my search result', () => {
    cy.get('#searchbar-container > :nth-child(2)')
        .invoke('text')
        .then((text) => {
            expect(text).to.match(/Your search yielded/);
        });
});

Then('I should see relevant products', () => {
    // TODO: implement step
});

*/

// test if I get no matching products
Given('my search had no matching products', () => {
    cy.get('#searchbar-results-container');
});

When('I look at the user feedback', () => {
    cy.get('p').should('exist');
});

Then('I should know if I my search term had no matched results', () => {
    cy.get('p').should('contain', 'No products matched your search');
});
