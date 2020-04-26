Feature: User Model

  Scenario: Cannot access this protected resource without authority
    Given I have no authority
    When I request the userModel
    Then the status code should be 404
    And the error should be You must be logged in to access this information.

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
