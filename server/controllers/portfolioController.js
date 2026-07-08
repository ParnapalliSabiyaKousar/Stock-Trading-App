const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// ==============================
// Get User Portfolio
// ==============================
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({
      user: req.user._id,
    }).populate("stock");

    let totalInvestment = 0;
    let currentValue = 0;
    let totalProfit = 0;

    portfolio.forEach((item) => {
      totalInvestment += item.totalInvestment;
      currentValue += item.currentValue;
      totalProfit += item.profitLoss;
    });

    res.status(200).json({
      success: true,
      portfolio,
      summary: {
        totalInvestment,
        currentValue,
        totalProfit,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Buy Stock
// ==============================
const buyStock = async (req, res) => {

  try {

    const { stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    const user = await User.findById(req.user._id);

    const totalCost = stock.currentPrice * quantity;

    if (user.wallet < totalCost) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Wallet Balance",
      });
    }

    let portfolio = await Portfolio.findOne({
      user: req.user._id,
      stock: stockId,
    });

    if (portfolio) {

      const totalQuantity =
        portfolio.quantity + quantity;

      portfolio.averageBuyPrice =
        (
          portfolio.averageBuyPrice *
            portfolio.quantity +
          stock.currentPrice * quantity
        ) / totalQuantity;

      portfolio.quantity = totalQuantity;

      portfolio.currentPrice =
        stock.currentPrice;

      await portfolio.save();

    } else {

      portfolio = await Portfolio.create({
        user: req.user._id,
        stock: stockId,
        quantity,
        averageBuyPrice:
          stock.currentPrice,
        currentPrice:
          stock.currentPrice,
      });

    }

    user.wallet -= totalCost;

    await user.save();

    await Transaction.create({

      user: req.user._id,

      stock: stockId,

      transactionType: "BUY",

      quantity,

      price: stock.currentPrice,

      totalAmount: totalCost,

    });

    res.status(200).json({

      success: true,

      message: "Stock Purchased Successfully",

      portfolio,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// Sell Stock
// ==============================
const sellStock = async (req, res) => {

  try {

    const { stockId, quantity } = req.body;

    const portfolio = await Portfolio.findOne({

      user: req.user._id,

      stock: stockId,

    });

    if (!portfolio) {

      return res.status(404).json({

        success: false,

        message: "Stock not found in portfolio",

      });

    }

    if (portfolio.quantity < quantity) {

      return res.status(400).json({

        success: false,

        message: "Not enough shares",

      });

    }

    const stock = await Stock.findById(stockId);

    const amount =
      stock.currentPrice * quantity;

    portfolio.quantity -= quantity;

    portfolio.currentPrice =
      stock.currentPrice;

    if (portfolio.quantity === 0) {

      await portfolio.deleteOne();

    } else {

      await portfolio.save();

    }

    const user = await User.findById(req.user._id);

    user.wallet += amount;

    await user.save();

    await Transaction.create({

      user: req.user._id,

      stock: stockId,

      transactionType: "SELL",

      quantity,

      price: stock.currentPrice,

      totalAmount: amount,

    });

    res.json({

      success: true,

      message: "Stock Sold Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  getPortfolio,

  buyStock,

  sellStock,

};