import React from "react";
import { Link } from "react-router-dom";
import "./Stocks.css";

const stocks = [
  {
    id: 1,
    name: "Apple",
    symbol: "AAPL",
    price: "$215.36",
    change: "+2.15%",
  },
  {
    id: 2,
    name: "Microsoft",
    symbol: "MSFT",
    price: "$512.18",
    change: "+1.24%",
  },
  {
    id: 3,
    name: "Tesla",
    symbol: "TSLA",
    price: "$318.80",
    change: "-0.64%",
  },
  {
    id: 4,
    name: "Amazon",
    symbol: "AMZN",
    price: "$228.14",
    change: "+0.91%",
  },
  {
    id: 5,
    name: "NVIDIA",
    symbol: "NVDA",
    price: "$174.82",
    change: "+4.31%",
  },
  {
    id: 6,
    name: "Google",
    symbol: "GOOGL",
    price: "$181.70",
    change: "+1.55%",
  },
];

export default function Stocks() {
  return (
    <div className="stocks-page">

      <h1>📈 Stock Market</h1>

      <div className="stocks-grid">

        {stocks.map((stock) => (

          <div className="stock-card" key={stock.id}>

            <h2>{stock.name}</h2>

            <h3>{stock.symbol}</h3>

            <h1>{stock.price}</h1>

            <p
              style={{
                color: stock.change.includes("-")
                  ? "red"
                  : "green",
                fontWeight: "bold",
              }}
            >
              {stock.change}
            </p>

            <Link to={`/stock/${stock.id}`}>
              View Chart
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}