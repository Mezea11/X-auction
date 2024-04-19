Feature: Visit a specific product by searching for it on the search page

    Scenario: As a visitor on the page a want to go to the search page
        Given that I am on the home page
        When I click on the search button
        Then I get redirected to the search page

    Scenario: When I am on the search page I want to search for a product and get a result
        Given that I am on the search page
        When I write something in the search bar
        And click on the search button
        Then I get user feedback on my search result

    Scenario: My search had no matched products
        Given my search had no matching products
        When I look at the user feedback
        Then I should know if I my search term had no matched results
