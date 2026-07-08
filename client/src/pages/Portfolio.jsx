import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Portfolio.css";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await axiosInstance.get("/portfolio");
      setPortfolio(res.data.portfolio);
      setSummary(res.data.summary);
    } catch (err) {
      console.log(err);
    }
  };

  const sellStock = async (stockId) => {
    const quantity = prompt("Enter Quantity to Sell");

    if (!quantity) return;

    try {
      await axiosInstance.post("/portfolio/sell", {
        stockId,
        quantity: Number(quantity),
      });

      alert("Stock Sold Successfully");
      fetchPortfolio();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to Sell");
    }
  };

  return (
    <>
      <Navbar />

      <div className="portfolio-page">

        <Sidebar />

        <div className="portfolio-content">

          <h1>My Portfolio</h1>

          <div className="summary">

            <div className="summary-card">
              <h3>Total Investment</h3>
              <h2>₹ {summary.totalInvestment}</h2>
            </div>

            <div className="summary-card">
              <h3>Current Value</h3>
              <h2>₹ {summary.currentValue}</h2>
            </div>

            <div className="summary-card">
              <h3>Profit / Loss</h3>

              <h2
                style={{
                  color:
                    summary.totalProfit >= 0
                      ? "green"
                      : "red",
                }}
              >
                ₹ {summary.totalProfit}
              </h2>

            </div>

          </div>

          <table>

            <thead>

              <tr>

                <th>Company</th>
                <th>Symbol</th>
                <th>Qty</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>P/L</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {portfolio.map((item) => (

                <tr key={item._id}>

                  <td>{item.stock.companyName}</td>

                  <td>{item.stock.symbol}</td>

                  <td>{item.quantity}</td>

                  <td>₹ {item.averageBuyPrice}</td>

                  <td>₹ {item.currentPrice}</td>

                  <td
                    style={{
                      color:
                        item.profitLoss >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    ₹ {item.profitLoss}
                  </td>

                  <td>

                    <button
                      className="sell-btn"
                      onClick={() =>
                        sellStock(item.stock._id)
                      }
                    >
                      Sell
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}