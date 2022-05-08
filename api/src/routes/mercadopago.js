const express = require("express");
const router = express.Router();

const Checkout = require("../Controllers/MercadoPagoControllers/Checkout");
const Success = require("../Controllers/MercadoPagoControllers/Success");
const state = require("../Controllers/MercadoPagoControllers/stateChange");
const payments = require("../Controllers/MercadoPagoControllers/getAllPayments");
const historial = require("../Controllers/MercadoPagoControllers/getUserHistory")
const amount = require("../Controllers/MercadoPagoControllers/getSellProducts")
const price = require("../Controllers/MercadoPagoControllers/getTotalVentas");

router.get("/price", price)
router.get("/amount", amount)
router.get("/history/:email", historial)
router.get("/payments", payments);
router.get("/success", Success);
router.put("/state", state);
router.post("/checkout", Checkout);

module.exports = router;
