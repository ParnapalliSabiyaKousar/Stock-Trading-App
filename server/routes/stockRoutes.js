const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const {
  protect,
  admin,
} = require("../middleware/auth");

// Public Routes
router.get("/", getAllStocks);
router.get("/:id", getStockById);

// Admin Routes
router.post("/", protect, admin, createStock);
router.put("/:id", protect, admin, updateStock);
router.delete("/:id", protect, admin, deleteStock);

module.exports = router;