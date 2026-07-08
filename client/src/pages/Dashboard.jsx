import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";



const watchlist = [
  { name: "Apple", symbol: "AAPL", price: "$215.36", change: "+2.15%" },
  { name: "Microsoft", symbol: "MSFT", price: "$512.18", change: "+1.24%" },
  { name: "Tesla", symbol: "TSLA", price: "$318.80", change: "-0.64%" },
  { name: "NVIDIA", symbol: "NVDA", price: "$174.82", change: "+4.31%" },
];

export default function Dashboard() {
 return (
  <>
  

    <div className="dashboard">

      <div className="dashboard">


        <div className="dashboard-header">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>Monitor your investments in one place.</p>
          </div>

          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <h3>Sabiya</h3>
              <span>Investor</span>
            </div>
          </div>
        </div>

        <div className="overview">

          <div className="card">
            <h4>Portfolio Value</h4>
            <h2>$25,430.50</h2>
            <span className="green">▲ +3.8%</span>
          </div>

          <div className="card">
            <h4>Today's Profit</h4>
            <h2>$540.20</h2>
            <span className="green">+$120 Today</span>
          </div>

          <div className="card">
            <h4>Stocks Owned</h4>
            <h2>24</h2>
            <span>Across 6 sectors</span>
          </div>

        </div>

        <div className="watchlist">

          <div className="section-title">
            <h2>🔥 Watchlist</h2>

            <Link to="/stocks">
              View All
            </Link>
          </div>

          {watchlist.map((stock) => (
            <div className="stock-row" key={stock.symbol}>
              <div>
                <h3>{stock.name}</h3>
                <p>{stock.symbol}</p>
              </div>

              <div>
                <h3>{stock.price}</h3>
                <p className={stock.change.includes("-") ? "red" : "green"}>
                  {stock.change}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  </>
);
}