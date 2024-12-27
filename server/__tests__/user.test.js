const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
  await User.sync({ force: true });
});

afterAll(async () => {
  await User.drop();
});

describe("User Registration and Login", () => {
  describe("User Registration", () => {
    test("should register a new user successfully", async () => {
      const response = await request(app).post("/users/add-user").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        phoneNumber: "08123456789",
        address: "Test Address",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.username).toBe("testuser");
      expect(response.body.email).toBe("testuser@example.com");
    });

    test("should return 400 when email is missing", async () => {
      const response = await request(app).post("/users/add-user").send({
        username: "userWithoutEmail",
        password: "password123",
        phoneNumber: "08123456787",
        address: "No Email Address",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });

    test("should return 400 when password is missing", async () => {
      const response = await request(app).post("/users/add-user").send({
        username: "userWithoutPassword",
        email: "noPassword@example.com",
        phoneNumber: "08123456786",
        address: "No Password Address",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password is required");
    });
  });

  describe("User Login", () => {
    test("should log in an existing user successfully", async () => {
      const response = await request(app).post("/users/login").send({
        email: "testuser@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
    });

    test("should not log in with incorrect password", async () => {
      const response = await request(app).post("/users/login").send({
        email: "testuser@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid email or password");
    });

    test("should not log in with unregistered email", async () => {
      const response = await request(app).post("/users/login").send({
        email: "unregistered@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid email or password");
    });

    test("should return 400 when email is missing", async () => {
      const response = await request(app).post("/users/login").send({
        email: "",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });

    test("should return 400 when password is missing", async () => {
      const response = await request(app).post("/users/login").send({
        email: "testuser@example.com",
        password: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password is required");
    });
  });
});
