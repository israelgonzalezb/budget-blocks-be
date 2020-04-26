Feature: Plaid API Scenarios

  Scenario: Creating a new user account to test this feature
    Given My email is "aDent@oy.uk"
    And My password is "dontpanic"
    And My firstname is "Arthur"
    And My lastname is "Dent"
    When I register then login on BudgetBlocks API
    Then the status code should be 200

  Scenario: It returns a JSON object.
    Given I have authority
    When I request the users categories
    Then I should receive a JSON object

  Scenario: test runner should have a publicToken
    Given I have a valid user account
    When I request the Plaid token exchange resource
    Then the body should be defined
