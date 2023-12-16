const express = require("express");
const { countAllRows, countPendingOrders } = require("../controllers/dashboard");

const dashRouter = express.Router();

dashRouter.get("/count/:table", countAllRows);
dashRouter.get("/countPendingOrders/:table", countPendingOrders);

module.exports = dashRouter;
