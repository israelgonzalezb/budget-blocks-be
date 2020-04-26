Feature: Requesting BudgetBlocks API

Scenario: Requesting BudgetBlocks API
  Given I am at the root this API
  When I make a GET request
  Then the status code should be 200
