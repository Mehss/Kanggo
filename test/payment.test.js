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

describe("POST /pay", () => {
    it("Should create pembayaran and respond in JSON with data", function (done) {
      request(app)
        .post("/pay/1")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
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

    it("Should return error if order is not found", function (done) {
      request(app)
        .post("/pay/99")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
            amount: 1
         })
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty(
            "error",
            expect.any(String)
          );
          done();
        })
        .catch(err => done(err))
    });
    
    it("Should return error if order is not found", function (done) {
      request(app)
        .post("/pay/99")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .send({ 
            amount: 1
         })
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty(
            "error",
            expect.any(String)
          );
          done();
        })
        .catch(err => done(err))
    });
});


describe("GET /payments", () => {
    it("Should show all order", function (done) {
        request(app)
        .get("/payment")
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
        
    it("Should return specific payment", function (done) {
        request(app)
        .get("/payment/1")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data", expect.any(Object));
            done();
        });
    });
    it("Should return 404", function (done) {
        request(app)
        .get("/payment/99")
        .set("Content-Type", "application/json")
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("error", expect.any(String));
            done();
        });
    });
});