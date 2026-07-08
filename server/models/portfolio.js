const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    averageBuyPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalInvestment: {
      type: Number,
      default: 0,
    },

    currentValue: {
      type: Number,
      default: 0,
    },

    profitLoss: {
      type: Number,
      default: 0,
    },

    profitLossPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically calculate values before saving
portfolioSchema.pre("save", function (next) {
  this.totalInvestment = this.averageBuyPrice * this.quantity;
  this.currentValue = this.currentPrice * this.quantity;
  this.profitLoss = this.currentValue - this.totalInvestment;

  if (this.totalInvestment > 0) {
    this.profitLossPercentage =
      (this.profitLoss / this.totalInvestment) * 100;
  } else {
    this.profitLossPercentage = 0;
  }

  next();
});

module.exports = mongoose.model("Portfolio", portfolioSchema);