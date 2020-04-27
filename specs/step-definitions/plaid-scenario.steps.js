const {
  loadFeature,
  defineFeature,
  request,
  server,
  userModel,
  genHeaders,
} = require("./common");
const feature = loadFeature("./specs/features/plaid-scenario.feature");

const api = request(server);

const registerAccount = (body) => api.post("/api/auth/register").send(body);

const loginAccount = (body) => api.post("/api/auth/login").send(body);

defineFeature(feature, (test) => {
  let email;
  let password;
  let response;
  let first_name;
  let last_name;
  let userID;
  let errorMessage;
  test("Creating a new user account to test this feature", ({
    given,
    and,
    when,
    then,
  }) => {
    given(/^My email is (.*)$/, (arg0) => {
      email = arg0;
    });
    and(/^My password is (.*)$/, (arg0) => {
      password = arg0;
    });
    and(/^My firstname is (.*)$/, (arg0) => {
      first_name = arg0;
    });
    and(/^My lastname is (.*)$/, (arg0) => {
      last_name = arg0;
    });

    when("I register then login on BudgetBlocks API", async () => {
      // register new user
      await registerAccount({
        email,
        password,
        first_name,
        last_name,
      });
      // login to account
      response = await loginAccount({ email, password });
      // capture variables
      message = response.body.message;
      LinkedAccount = response.body.LinkedAccount;
      ManualOnly = response.body.ManualOnly;
      token = response.body.token;
      userId = response.body.id;
      // console.log(message);
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });
  });

  test("It returns a JSON object.", ({ given, when, then }) => {
    given("I have authority", async () => {
      token & userId & LinkedAccount & ManualOnly & message;
      headers = genHeaders(token);
    });

    when("I request the users categories", async () => {
      // with supertest, you set the headers last
      // right-to-left composition ?
      response = await api.get("/users").set(headers);
    });

    then("I should receive a JSON object", () => {
      expect(response.type).toMatch(/json/i);
    });

    test("test runner should have a publicToken", ({ given, when, then }) => {
      given("I have a valid user account", () => {
        userId && token;
      });

      when("I request the Plaid token exchange resource", async () => {
        // todo
      });

      then("the body should be defined", async () => {
        // todo
        // expect(response.type).toMatch(/json/i);
        userModel.deleteUser(userID); // delete the test user we created
      });
    });
  });
});
