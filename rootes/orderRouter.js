const express = require("express");
const { readOrders, placeOrder, updateOrderFromClient, removeOrder } = require("../controllers/orders");
const orderRouter = express.Router();

orderRouter.get("/", readOrders);

orderRouter.get("/placeOrder", placeOrder);
orderRouter.get("/updateOrder", updateOrderFromClient);
orderRouter.get("/deleteOrder", removeOrder);

module.exports = orderRouter;
