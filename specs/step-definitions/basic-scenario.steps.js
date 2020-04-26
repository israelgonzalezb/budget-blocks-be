const { loadFeature, defineFeature } = require("jest-cucumber");
const request = require("supertest");
const server = require("../../data/server");

const feature = loadFeature("./specs/features/basic-scenario.feature");

defineFeature(feature, (test) => {
  test("Requesting BudgetBlocks API", ({ given, when, then }) => {
    let api;
    let response;

    given("I am at the root this API", async () => {
      api = request(server);
    });

    when("I make a GET request", async () => {
      response = await api.get("/");
    });
    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });
  });
});
