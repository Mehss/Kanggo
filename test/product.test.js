const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')
let access_token = ""
let fail_token = ""

beforeAll((done) => {
    access_token = jwt.sign(
      {
        id:1,
      },
      process.env.SECRET_KEY
    );
    fail_token = jwt.sign(
      {
        id:2,
      },
      process.env.SECRET_KEY
    );
    done();
  });
  
describe("POST /product", () => {
    it("Should create product and respone in JSON with data", function (done) {
      request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .send({ 
            name: "testItem",
            price: 20,
            qty: 10
         })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty(
            "data",
            expect.any(Object)
          );
          done();
        });
    });
    it("Should not create product and give response error if name is empty", function (done) {
      request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .send({ name: null})
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(Array));
          done();
        });
    });
});


describe("GET /product", () => {
    it("Should show all product", function (done) {
        request(app)
        .get("/products")
        .set("Content-Type", "application/json")
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
                "data",
                expect.any(Array)
                );
                done();
            });
        });
        
        it("Should return specific product", function (done) {
            request(app)
            .get("/products/1")
            .set("Content-Type", "application/json")
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("data", expect.any(Object));
                done();
            });
        });
    });

describe("PUT /product", () => {
    it("Should edit product and respone in JSON with data", function (done) {
        request(app)
        .put("/products/1")
        .set("Content-Type", "application/json")
        .send({ 
            price: 25,
            })
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
            "data",
            expect.any(Object)
            );
            done();
        });
    });
    it("Should not edit product and give response error if name is empty", function (done) {
        request(app)
        .put("/products/1")
        .set("Content-Type", "application/json")
        .send({ name: null})
        .then((response) => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error", expect.any(Array));
            done();
        });
    });
    it("Should return 404 if product does not exist", function (done) {
        request(app)
        .put("/products/99")
        .set("Content-Type", "application/json")
        .send({ name: "test"})
        .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error", expect.any(String));
            done();
        });
    });
});

describe("DEL /product", () => {
    it("Should delete product", function (done) {
        request(app)
        .delete("/products/2")
        .set("Content-Type", "application/json")
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
            "message",
            expect.any(String)
            );
            done();
        });
    });

    it("Should return 404 if product does not exist", function (done) {
        request(app)
        .delete("/products/99")
        .set("Content-Type", "application/json")
        .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error", expect.any(String));
            done();
        });
    });
});