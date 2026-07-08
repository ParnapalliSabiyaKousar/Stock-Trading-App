const express = require("express");
const router = express.Router();

const {
  getTransactions,
  getAllTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

const {
  protect,
  admin,
} = require("../middleware/auth");

// User Transactions
router.get("/", protect, getTransactions);

// Admin Transactions
router.get("/all", protect, admin, getAllTransactions);

// Delete Transaction
router.delete("/:id", protect, admin, deleteTransaction);

module.exports = router;