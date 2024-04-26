Feature: login
 
    Scenario: login
        Given that I am on the home page
        When I click on the login button
        Then the login modal opens
        Then I type in incorrect user info
        When I press the Login button
        When Incorrect username or password. Please try again.
        Then I clear the form
        When I type in correct user info
        Then I get logged in
        Then I get routed to My page
