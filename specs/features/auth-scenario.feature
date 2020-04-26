Feature: Authenticating Users on BudgetBlocks API

  Scenario: Creating a new user account
    Given My email is "drJones@watch.out"
    And My password is "checkoutmytest"
    And My firstname is "Indiana"
    And My lastname is "Jones"
    When I register on BudgetBlocks API
    Then the status code should be 201

  Scenario: Cannot register with duplicate email
    Given My email is "drJones@watch.out"
    And My password is "notThatOtherDoctor"
    And My firstname is "Alex"
    And My lastname is "Jones"
    When I register on BudgetBlocks API
    Then the status code should be 400

  Scenario: Cannot register with empty email
    Given My email is undefined
    And My password is ghastlyIsntIt?
    And My firstname is "Marvin"
    And My lastname is "theParanoidAndroid"
    When I register on BudgetBlocks API
    Then the status code should be 500

  Scenario: Cannot register with empty password
    Given My email is "whyBother@whatever.life"
    And My password is undefined
    And My firstname is "Marvin"
    And My lastname is "theParanoidAndroid"
    When I register on BudgetBlocks API
    Then the status code should be 400

  Scenario: Cannot register without body
    Given I have no body to send
    When I register on BudgetBlocks API
    Then the status code should be 500

  Scenario: Cannot register with bad password
    Given My email is "someDroid@somewhere.inTime"
    And My password is I could calculate your chance of survival, but you won’t like it.
    And My firstname is "Marvin"
    And My lastname is "theParanoidAndroid"
    When I register on BudgetBlocks API
    Then the status code should be 400

  Scenario: Logging in with empty body
    Given No body is passed in
    When I login on BudgetBlocks API
    Then the error should be No information was passed into the body.

  Scenario: Logging in without an email
    Given No email was provided
    And My password is "password"
    When I login on BudgetBlocks API
    Then the status code should be 400
    And the error should be Please provide an email.

  Scenario: Logging in without a password
    Given No password was provided
    And My email is "test@test.com"
    When I login on BudgetBlocks API
    Then the status code should be 400
    And the error should be Please provide a password.

  Scenario: Logging into a user account
    Given My email is "drJones@watch.out"
    And My password is "checkoutmytest"
    When I login on BudgetBlocks API
    Then the status code should be 200

  Scenario: Protected route requires authorization
    Given no authorization token exists
    When I request this resource
    Then the status code should be 404
    And the error should be You must be logged in to access this information.
