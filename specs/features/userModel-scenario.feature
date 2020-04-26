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

  Scenario: Categories exist for a user
    Given I have a valid user id
    And I have a valid token
    When I request the categories
    Then the status should be 200

  Scenario: List of All Users
    Given I have the authority
    And I want a list of every user
    When I request the user list
    Then the status will be 200
    And the body should be defined

  Scenario: Should get total budget
    Given I have a valid account
    When I request my total budget
    Then the status should be 200
    And the body should be defined
