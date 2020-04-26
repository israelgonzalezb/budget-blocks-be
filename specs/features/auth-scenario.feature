Feature: Authenticating Users on BudgetBlocks API

Scenario: Creating a new user account
  Given My email is "drJones@watch.out"
  And My password is "checkoutmytest"
  And My firstname is "Indiana"
  And My lastname is "Jones"
  When I register on BudgetBlocks API
  Then the status code should be 201

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
