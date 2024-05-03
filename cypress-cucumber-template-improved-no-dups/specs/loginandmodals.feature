Feature: Login and modals

    Scenario: Login and modals
        Given I am on the home page
        When I click on the login button
        Then the login modal should open
        When I enter the correct user credentials
        Then I should be logged in
        And I should be redirected to My Page
        When I click on the post product button
        Then the post product modal should open
        When I click outside the post product modal
        Then the post product modal should close
        When I click on the update product button
        Then the update product modal should open
        When I click outside the update product modal
        Then the update product modal should close
        When I click on the change user info button
        Then the change user info modal should open
        When I click outside the change user info modal
        Then the modal change user info should close

        
