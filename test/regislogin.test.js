const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");

describe("POST /register", () => {
    it("Should create user and respone in JSON with access_token", function (done) {
      request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({ email: "tester2@mail.com", password: "qwerty" })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty(
            "access_token",
            expect.any(String)
          );
          done();
        });
    });
  
    it("Should not create user and give response error if empty input", function (done) {
      request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({ email: "", password: "" })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(String));
          done();
        });
    });

    it("Should not create user and give response error if email is taken", function (done) {
      request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({ email: "tester@mail.com", password: "aaaaa" })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(String));
          done();
        });
    });
});

describe("POST /login", () => {
    it("Should create user and respone in JSON with access_token", function (done) {
      request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "tester@mail.com", password: "qwerty" })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty(
            "access_token",
            expect.any(String)
          );
          done();
        });
    });

    it("Should not create user and give response error if empty input", function (done) {
      request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "", password: "" })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(String));
          done();
        });
    });
    
    it("Should not login and give response error if password is wrong", function (done) {
      request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "tester@mail.com", password: "1111" })
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("error", expect.any(String));
          done();
        });
    });

    it("Should not login and give response error if email is unregistered", function (done) {
      request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({ email: "nonmail@mail.com", password: "1111" })
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("error", expect.any(String));
          done();
        });
    });
});
