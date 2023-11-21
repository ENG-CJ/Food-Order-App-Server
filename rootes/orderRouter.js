const express = require("express");
const { readOrders, placeOrder, updateOrderFromClient, removeOrder, statusApproval } = require("../controllers/orders");
const orderRouter = express.Router();

orderRouter.get("/", readOrders);

orderRouter.post("/placeOrder", placeOrder);
orderRouter.put("/updateOrder/:id", updateOrderFromClient);
orderRouter.delete("/deleteOrder/:id", removeOrder);
orderRouter.put("/approve/:id", statusApproval);

module.exports = orderRouter;
