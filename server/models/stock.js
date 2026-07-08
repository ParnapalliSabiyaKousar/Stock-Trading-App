const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    sector: {
      type: String,
      default: "Technology",
    },

    exchange: {
      type: String,
      default: "NASDAQ",
    },

    currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    previousClose: {
      type: Number,
      default: 0,
    },

    openPrice: {
      type: Number,
      default: 0,
    },

    highPrice: {
      type: Number,
      default: 0,
    },

    lowPrice: {
      type: Number,
      default: 0,
    },

    volume: {
      type: Number,
      default: 0,
    },

    marketCap: {
      type: Number,
      default: 0,
    },

    change: {
      type: Number,
      default: 0,
    },

    changePercent: {
      type: Number,
      default: 0,
    },

    logo: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);