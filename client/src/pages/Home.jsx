import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState({});
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    fetchProfile();
    fetchStocks();
    fetchPortfolio();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStocks = async () => {
    try {
      const res = await axiosInstance.get("/stocks");
      setStocks(res.data.stocks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const res = await axiosInstance.get("/portfolio");
      setPortfolio(res.data.portfolio);
      setSummary(res.data.summary);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <Sidebar />

        <div className="content">

          <h1>Welcome, {user.name}</h1>

          <div className="cards">

            <div className="card">
              <h3>Wallet</h3>
              <h2>₹ {user.wallet}</h2>
            </div>

            <div className="card">
              <h3>Investment</h3>
              <h2>₹ {summary.totalInvestment}</h2>
            </div>

            <div className="card">
              <h3>Current Value</h3>
              <h2>₹ {summary.currentValue}</h2>
            </div>

            <div className="card">
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

          <h2>Market Overview</h2>

          <table>

            <thead>
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>

            <tbody>

              {stocks.map((stock) => (

                <tr key={stock._id}>

                  <td>{stock.companyName}</td>

                  <td>{stock.symbol}</td>

                  <td>₹ {stock.currentPrice}</td>

                  <td
                    style={{
                      color:
                        stock.change >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {stock.changePercent}%
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