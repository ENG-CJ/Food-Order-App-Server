const express = require("express");
const { readOrders, placeOrder, updateOrderFromClient, removeOrder, statusApproval, active, readOrderData, readSinglePrintableData, printAllData, readOrdersForSpecificCustomer, readPendingOrders, activateAll, deactivateAll, readTotalAmountOfCustomer, updatePaymentAmountOfCustomer } = require("../controllers/orders");

const orderRouter = express.Router();
orderRouter.get("/printAllData", printAllData);
orderRouter.get("/pendingOrders", readPendingOrders);
orderRouter.get("/", readOrders);
orderRouter.get("/specificOrder/:id", readOrdersForSpecificCustomer);
orderRouter.get("/:id", readOrderData);
orderRouter.get("/readSinglePrintableData/:id", readSinglePrintableData);
orderRouter.post("/activate", active);
orderRouter.post("/activateAll", activateAll);
orderRouter.post("/getTotalAmount", readTotalAmountOfCustomer);
orderRouter.post("/updatePayment", updatePaymentAmountOfCustomer);
orderRouter.post("/deactivateAll", deactivateAll);
orderRouter.post("/placeOrder", placeOrder);
orderRouter.put("/updateOrder/:id", updateOrderFromClient);
orderRouter.delete("/deleteOrder/:id", removeOrder);
orderRouter.put("/approve/:id", statusApproval);


module.exports = orderRouter;
