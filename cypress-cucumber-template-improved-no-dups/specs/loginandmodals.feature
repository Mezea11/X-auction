Feature: login and modals
 
    Scenario: login and modals
        Given that I am on the home page
        When I click on the login button
        Then the login modal opens
        When I type in correct user info
        Then I get logged in
        Then I get routed to My page
        Then I click on the post product button
        Then I click outside the post product modal
        Then I click on the Update Product button
        Then I click outside the Update Product modal
        Then I click on the Change user info button
        Then I click outside the Change user info modal
