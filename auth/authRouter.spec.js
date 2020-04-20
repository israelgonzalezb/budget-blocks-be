const request = require("supertest");
const server = require("../data/server");
const Users = require("../users/users-model");
const db = require("../data/db-config");
/*
describe("000: Auth-Router GET", function () {
  // beforeEach(() => {
  //   moxios.install(request);
  //   jest.clearAllMocks();
  // });
  afterAll(async () => {
    // avoid jest open handle error
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });
  test("should return 404 on GET /api/auth/register", async () => {
    const result = await app.get("/api/auth/register");
    expect(result.status).toBe(401);
  });
  test("should return 404 on GET /api/auth/login", async () => {
    const result = await app.get("/api/auth/login");
    expect(result.status).toBe(401);
  });
});
*/

describe("Login and Registration", () => {
  describe("Registration", () => {
    describe("Check validity of HTTP methods", () => {
      test("should return 404 on GET /api/auth/register", async () => {
        const result = await request(server).get("/api/auth/register");
        expect(result.status).toBe(404);
      });
      test("should return 404 on PUT /api/auth/register", async () => {
        const result = await request(server).put("/api/auth/register").send({});
        expect(result.status).toBe(404);
      });
      test("should return 404 on DELETE /api/auth/register", async () => {
        const result = await request(server)
          .delete("/api/auth/register")
          .send({ id: 1 });
        expect(result.status).toBe(404);
      });
    });
    describe("Registers a new user", () => {
      beforeAll(async () => {
        process.env.NODE_ENVIRONMENT == "test" &&
          (await db.raw("truncate table users cascade"));
        await db("users");
      });

      const user = {
        email: "test@test.com",
        password: "password",
        first_name: "greg", // Seems to be optional?
        last_name: "lala", // Seems to be optional?
      };

      test("Should allow a new user to be created", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send(user);
        expect(response.status).toBe(201);
      });

      test("Should not allow you to register a duplicate email address", async () => {
        // 403 Forbidden http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4
        const response = await request(server)
          .post("/api/auth/register")
          .send(user);
        expect(response.status).toBe(400);
      });
    });
    // describe("Login", () => {

    // })
  });
});

/*
describe("Users Login & Register", () => {
  let newUserID;

  beforeAll(async () => {});

  afterAll(async () => {
    await Users.deleteUser(newUserID);
  });

  describe("Registers a new user", () => {
    beforeAll(async () => {
      await db("users");
    });

    test("Should allow a new user to be created", async () => {
      const user = {
        email: "test@test.com",
        password: "password",
        first_name: "greg", // Seems to be optional?
        last_name: "lala", // Seems to be optional?
      };
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toBe(201);
      console.log("register response", response);
      await Users.deleteUser(response.body.id);
    });

    test("Should not allow you to register a duplicate email address", async () => {
      const user = {
        email: "test@test.com",
        password: "password",
        first_name: "greg", // Seems to be optional?
        last_name: "lala", // Seems to be optional?
      };
      // 403 Forbidden http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toBe(403);
    });
  });

  test("Should allow a user to login", async () => {
    const user = { email: "test@test.com", password: "password" };

    // await Users.login(user);
    const response = await request(server).post("/api/auth/login").send(user);

    // console.log("allowLogin", response.body, response.status);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    newUserID = response.body.id;
  });

  test("Should return an error if no body is passed in", async () => {
    const response = await request(server).post("/api/auth/login");

    expect(response.body.error).toBe(
      "No information was passed into the body."
    );
  });

  test("Should return an error if body is missing", async () => {
    const response = await request(server).post("/api/auth/login");

    expect(response.body.error).toBe(
      "No information was passed into the body."
    );
  });

  test("Should return an error if no email is provided", async () => {
    const user = { password: "password" };

    // await Users.login(user);
    const response = await request(server).post("/api/auth/login").send(user);
    // console.log(response);

    expect(response.status).toBe(400);
    expect(response.status).toBeDefined();
    expect(response.body.error).toBe("Please provide an email.");
  });

  test("Should return an error if no password is provided", async () => {
    const user = { email: "test@test.com" };

    // await Users.login(user);
    const response = await request(server).post("/api/auth/login").send(user);
    // console.log(response);

    expect(response.status).toBe(400);
    expect(response.status).toBeDefined();
    expect(response.body.error).toBe("Please provide a password.");
  });

  test("Should return an error if no token is passed in", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(
      "You must be logged in to access this information."
    );
  });

  test("Should return a list of users", async () => {
    const response = await Users.allUsers();

    expect(response).toBeDefined();
  });
});
*/
