const { loadFeature, defineFeature, request, server } = require("./common");
const feature = loadFeature("./specs/features/basic-scenario.feature");

defineFeature(feature, (test) => {
  test("Requesting BudgetBlocks API", ({ given, when, then, and }) => {
    let api;
    let response;
    given("I am at the root this API", () => {
      api = request(server);
    });

    when("I make a GET request", async () => {
      response = await api.get("/");
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });

    and("the type should be json", () => {
      expect(response.type).toMatch(/json/i);
    });
  });
});
