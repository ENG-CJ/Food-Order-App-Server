const express = require("express");
const { readOrders, placeOrder, updateOrderFromClient, removeOrder } = require("../controllers/orders");
const orderRouter = express.Router();

orderRouter.get("/", readOrders);

orderRouter.get("/placeOrder", placeOrder);
orderRouter.put("/updateOrder/:id", updateOrderFromClient);
orderRouter.delete("/deleteOrder/:id", removeOrder);
orderRouter.put("/approve/:id", removeOrder);

module.exports = orderRouter;
