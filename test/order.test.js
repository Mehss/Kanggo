const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')
access_token = ""
fail_token = ""

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
describe("POST /order", () => {
    it("Should create order and respone in JSON with data", function (done) {
      request(app)
        .post("/orders")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
            product_id: 1,
            amount: 1
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

    it("Should return error if product_id is empty", function (done) {
      request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
          product_id: null,
          amount: 1
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(Array));
          done();
        });
    });

    it("Should return error if product is not found", function (done) {
      request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
            product_id: 99,
            amount: 1
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error", expect.any(Array));
          done();
        });
    });
});


describe("GET /orders", () => {
    it("Should show all order", function (done) {
        request(app)
        .get("/orders")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
                "data",
                expect.any(Array)
                );
                done();
            });
        });
        
        it("Should return specific order", function (done) {
            request(app)
            .get("/orders/1")
            .set("Content-Type", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("data", expect.any(Object));
                done();
            });
        });
    });

describe("patch /orders", () => {
    it("Should edit order and respone in JSON with data", function (done) {
        request(app)
        .patch("/orders/1")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
            amount: 25,
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

    it("Should not edit product and give response error if access token is empty", function (done) {
        request(app)
        .patch("/orders/1")
        .set("Content-Type", "application/json")
        .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("error", expect.any(String));
            done();
        });
    });

    it("Should return error if user is not order issuer", function (done) {
      request(app)
      .patch("/orders/1")
      .set("Content-Type", "application/json")
      .set('access_token', fail_token)
      .send({ 
        amount: 25,
        })
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          "error",
          expect.any(String)
          );
          done();
        });
      });
  
    it("Should return 404 if order does not exist", function (done) {
        request(app)
        .patch("/orders/99")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({amount: 25})
        .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error", expect.any(String));
            done();
        });
    });
});

describe("DEL /order", () => {
  
  it("Should return error if no access token", function (done) {
    request(app)
    .delete("/orders/2")
    .set("Content-Type", "application/json")
    .then((response) => {
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        expect.any(String)
        );
        done();
      });
    });
    
    it("Should return error if user is not order issuer", function (done) {
      request(app)
      .delete("/orders/2")
      .set("Content-Type", "application/json")
      .set('access_token', fail_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          "error",
          expect.any(String)
          );
          done();
        });
      });
      
    it("Should return 404 if order does not exist", function (done) {
      request(app)
      .delete("/orders/99")
      .set("Content-Type", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", expect.any(String));
        done();
      })
      .catch(e => done(e))
    });

    it("Should delete order", function (done) {
        request(app)
        .delete("/orders/2")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty(
            "message",
            expect.any(String)
            );
            done();
        });
    });
});