const {
  loadFeature,
  defineFeature,
  request,
  server,
  userModel,
  genHeaders,
} = require("./common");
const feature = loadFeature("./specs/features/userModel-scenario.feature");
const api = request(server);

const registerAccount = (body) => api.post("/api/auth/register").send(body);
const loginAccount = (body) => api.post("/api/auth/login").send(body);

defineFeature(feature, (test) => {
  let response;
  let message;
  let userId;
  let token;
  let LinkedAccount;
  let ManualOnly;
  let headers;
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
  });
  test("Cannot access this protected resource without authority", ({
    given,
    when,
    then,
    and,
  }) => {
    given("I have no authority", async () => {
      userModel.deleteUser(userId); // delete the test user we created
    });

    when("I request the userModel", async () => {
      response = await api.get("/api/users");
      errorMessage = response.body.error || undefined;
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });

    and(/^the error should be (.*)$/, (arg0) => {
      expect(errorMessage).toBe(arg0);
    });
  });
});
