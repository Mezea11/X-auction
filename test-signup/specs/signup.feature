Feature: User Signup
    As a new user I want to sign up on the website so I can use its features

    Scenario: As a user who wants to sign up, I need to open up the sign up modal
        Given that I am on the home page
        When I click on the signup button
        Then the signup modal opens


    Scenario: Fill in user info
        Given that the sign up model is open
        When I fill in the following new user information:
            | Username   | test1                 |
            | Email      | test1@test1.com |
            | Password   | hej     |
            | ConfirmPassword   | hej     |
        Then I click the create account button in the modal
        Then my new account should be created successfully
        And I should see a visual confirmation on the modal