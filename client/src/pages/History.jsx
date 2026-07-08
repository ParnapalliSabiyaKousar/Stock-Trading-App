import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./History.css";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/transactions");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="history-page">

        <Sidebar />

        <div className="history-content">

          <h1>Transaction History</h1>

          <table>

            <thead>

              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {transactions.map((item) => (

                <tr key={item._id}>

                  <td>{item.stock.companyName}</td>

                  <td>{item.stock.symbol}</td>

                  <td>
                    <span
                      className={
                        item.transactionType === "BUY"
                          ? "buy"
                          : "sell"
                      }
                    >
                      {item.transactionType}
                    </span>
                  </td>

                  <td>{item.quantity}</td>

                  <td>₹ {item.price}</td>

                  <td>₹ {item.totalAmount}</td>

                  <td>{item.orderStatus}</td>

                  <td>
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
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