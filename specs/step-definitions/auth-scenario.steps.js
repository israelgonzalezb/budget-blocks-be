const {
  loadFeature,
  defineFeature,
  request,
  server,
  userModel,
} = require("./common");
const feature = loadFeature("./specs/features/auth-scenario.feature");

defineFeature(feature, (test) => {
  const api = request(server);
  let email;
  let password;
  let response;
  let first_name;
  let last_name;
  let newUserID;
  let errorMessage;

  test("Creating a new user account", ({ given, and, when, then }) => {
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

    when("I register on BudgetBlocks API", async () => {
      response = await api
        .post("/api/auth/register")
        .send({ email, password, first_name, last_name });
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });
  });

  test("Logging in with empty body", ({ given, when, then }) => {
    given("No body is passed in", () => {
      // nothing to do here
      email = undefined;
    });

    when("I login on BudgetBlocks API", async () => {
      response = await api.post("/api/auth/login");
      errorMessage = response.body.error || undefined;
    });

    then(/^the error should be (.*)$/, (arg0) => {
      expect(errorMessage).toBe(arg0);
    });
  });

  test("Logging in without an email", ({ given, and, when, then }) => {
    given("No email was provided", () => {
      email = undefined;
    });

    and(/^My password is (.*)$/, (arg0) => {
      password = arg0;
    });

    when("I login on BudgetBlocks API", async () => {
      response = await request(server)
        .post("/api/auth/login")
        .send({ password });
      errorMessage = response.body.error || undefined;
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });

    and(/^the error should be (.*)$/, (arg0) => {
      expect(errorMessage).toBe(arg0);
    });
  });

  test("Logging in without a password", ({ given, and, when, then }) => {
    given("No password was provided", () => {
      password = undefined;
    });

    and(/^My email is (.*)$/, (arg0) => {
      email = arg0;
    });

    when("I login on BudgetBlocks API", async () => {
      response = await request(server).post("/api/auth/login").send({ email });
      errorMessage = response.body.error || undefined;
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });

    and(/^the error should be (.*)$/, (arg0) => {
      expect(errorMessage).toBe(arg0);
    });
  });

  test("Logging into a user account", ({ given, and, when, then }) => {
    given(/^My email is (.*)$/, (arg0) => {
      email = arg0;
    });

    and(/^My password is (.*)$/, (arg0) => {
      password = arg0;
    });
    when("I login on BudgetBlocks API", async () => {
      response = await request(server)
        .post("/api/auth/login")
        .send({ email, password });
    });

    then(/^the status code should be (.*)$/, async (arg0) => {
      expect(response.status).toBe(Number(arg0));
      expect(response.body).toBeDefined();
      newUserID = response.body.id;
      await userModel.deleteUser(newUserID); // delete the test user we created
    });
  });

  test("Protected route requires authorization", ({
    given,
    when,
    then,
    and,
  }) => {
    given("no authorization token exists", () => {
      //
    });

    when("I request this resource", async () => {
      response = await request(server).get("/api/users");
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
