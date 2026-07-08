const express = require("express");
const router = express.Router();

const {
  getPortfolio,
  buyStock,
  sellStock,
} = require("../controllers/portfolioController");

const {
  protect,
} = require("../middleware/auth");

// Get portfolio
router.get("/", protect, getPortfolio);

// Buy stock
router.post("/buy", protect, buyStock);

// Sell stock
router.post("/sell", protect, sellStock);

module.exports = router;