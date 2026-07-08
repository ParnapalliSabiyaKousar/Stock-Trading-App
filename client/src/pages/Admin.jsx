import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import "./Admin.css";

export default function Admin() {

  const [stats, setStats] = useState({
    users: 0,
    stocks: 0,
    transactions: 0,
    portfolio: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        users,
        stocks,
        transactions,
        portfolio,
      ] = await Promise.all([
        axiosInstance.get("/users"),
        axiosInstance.get("/stocks"),
        axiosInstance.get("/transactions/all"),
        axiosInstance.get("/portfolio"),
      ]);

      setStats({
        users: users.data.count,
        stocks: stocks.data.total,
        transactions: transactions.data.count,
        portfolio: portfolio.data.portfolio.length,
      });

      setRecentTransactions(
        transactions.data.transactions.slice(0, 5)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-page">

        <Sidebar />

        <div className="admin-content">

          <h1>Admin Dashboard</h1>

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Total Users</h3>
              <h2>{stats.users}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Stocks</h3>
              <h2>{stats.stocks}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Transactions</h3>
              <h2>{stats.transactions}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Portfolios</h3>
              <h2>{stats.portfolio}</h2>
            </div>

          </div>

          <div className="recent-section">

            <h2>Recent Transactions</h2>

            <table>

              <thead>

                <tr>
                  <th>User</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {recentTransactions.map((item) => (

                  <tr key={item._id}>

                    <td>{item.user?.name}</td>

                    <td>{item.stock?.symbol}</td>

                    <td>{item.transactionType}</td>

                    <td>₹ {item.totalAmount}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}