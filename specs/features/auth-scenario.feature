Feature: Authenticating Users on BudgetBlocks API

Scenario: Creating a new user account on BudgetBlocks API
  Given My email is "drJones@test.test"
  And My password is "checkoutmytest"
  When I register on BudgetBlocks API
  Then the status code should be 201

Scenario: Logging into a user account on BudgetBlocks API
  Given My email is "drJones@test.test"
  And My password is "checkoutmytest"
  When I login on BudgetBlocks API
  Then the status code should be 200
  