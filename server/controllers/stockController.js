const Stock = require("../models/Stock");

// ===============================
// Get All Stocks
// ===============================
const getAllStocks = async (req, res) => {
  try {
    const { search, sector, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { symbol: { $regex: search, $options: "i" } },
      ];
    }

    if (sector) {
      filter.sector = sector;
    }

    const stocks = await Stock.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ companyName: 1 });

    const total = await Stock.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      stocks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get Stock By ID
// ===============================
const getStockById = async (req, res) => {

  try {

    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.json({
      success: true,
      stock,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ===============================
// Create Stock
// ===============================
const createStock = async (req, res) => {

  try {

    const stock = await Stock.create(req.body);

    res.status(201).json({
      success: true,
      message: "Stock Added Successfully",
      stock,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ===============================
// Update Stock
// ===============================
const updateStock = async (req, res) => {

  try {

    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.json({
      success: true,
      message: "Stock Updated",
      stock,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ===============================
// Delete Stock
// ===============================
const deleteStock = async (req, res) => {

  try {

    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    await stock.deleteOne();

    res.json({
      success: true,
      message: "Stock Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};