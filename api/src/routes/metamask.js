const express = require("express");
const router = express.Router();

const Checkout = require("../Controllers/MetamaskControllers/postOrder");
const getOrders = require("../Controllers/MetamaskControllers/getOrders");
const putOrder = require("../Controllers/MetamaskControllers/putOrder");
// const Success = require("../Controllers/MercadoPagoControllers/Success");
// const state = require("../Controllers/MercadoPagoControllers/stateChange");
// const historial = require("../Controllers/MercadoPagoControllers/getUserHistory")
// const amount = require("../Controllers/MercadoPagoControllers/getSellProducts")
// const price = require("../Controllers/MercadoPagoControllers/getTotalVentas");
// const restore = require("../Controllers/MercadoPagoControllers/RestoreStock");

// router.put("/restore", restore)
// router.get("/price", price)
// router.get("/amount", amount)
// router.get("/history/:email", historial)
// router.get("/payments", payments);
// router.get("/success", Success);
router.put("/order", putOrder);
router.get("/orders", getOrders);
router.post("/order", Checkout);

module.exports = router;
