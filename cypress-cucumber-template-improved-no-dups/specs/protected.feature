Feature: protected route

Scenario: trying to access page that I do not have the right to access
Given that I am not logged in
When I enter the URL for mypage
Then I am rerouted to the home page
