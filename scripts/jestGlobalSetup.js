const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')
let access_token = ""

module.exports = async () => {
    const salt = bcrypt.genSaltSync(1);
    const user = {
        email: "tester@mail.com",
        password: bcrypt.hashSync("qwerty", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    await queryInterface.bulkInsert("Users", [user]);
    const product = {
        name: "testPr",
        price: 10,
        qty: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    await queryInterface.bulkInsert("Products", [product])
    const product2 = {
        name: "testDel",
        price: 10,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    await queryInterface.bulkInsert("Products", [product2])
    await queryInterface.bulkInsert("Orders", [{
        user_id: 1,
        product_id: 1,
        amount: 1,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
    await queryInterface.bulkInsert("Orders", [{
        user_id: 1,
        product_id: 1,
        amount: 1,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
    await queryInterface.bulkInsert("Pembayarans", [{
        order_id: 1,
        amount: 1,
        status: "paid",
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
    await queryInterface.bulkInsert("Pembayarans", [{
        order_id: 1,
        amount: 1,
        status: "paid",
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
};