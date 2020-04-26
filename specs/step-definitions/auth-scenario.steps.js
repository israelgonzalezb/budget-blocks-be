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
  let first_name = "doctor";
  let last_name = "jones";
  let newUserID;

  test("Creating a new user account on BudgetBlocks API", ({
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

    when("I register on BudgetBlocks API", async () => {
      response = await api
        .post("/api/auth/register")
        .send({ email, password, first_name, last_name });
    });

    then(/^the status code should be (.*)$/, (arg0) => {
      expect(response.status).toBe(Number(arg0));
    });
  });

  test("Logging into a user account on BudgetBlocks API", ({
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
});
