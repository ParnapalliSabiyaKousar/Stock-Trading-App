import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./AllTransactions.css";

export default function AllTransactions() {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/transactions/all");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {

    if (!window.confirm("Delete this transaction?")) return;

    try {

      await axiosInstance.delete(`/transactions/${id}`);

      fetchTransactions();

    } catch (err) {

      alert(err.response?.data?.message || "Delete Failed");

    }
  };

  const filteredTransactions = transactions.filter((item) => {

    const userName = item.user?.name || "";
    const symbol = item.stock?.symbol || "";

    return (
      userName.toLowerCase().includes(search.toLowerCase()) ||
      symbol.toLowerCase().includes(search.toLowerCase())
    );

  });

  return (
    <>
      <Navbar />

      <div className="transactions-page">

        <Sidebar />

        <div className="transactions-content">

          <h1>All Transactions</h1>

          <input
            className="search-box"
            placeholder="Search User or Stock..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table>

            <thead>

              <tr>

                <th>User</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.map((item) => (

                <tr key={item._id}>

                  <td>{item.user?.name}</td>

                  <td>{item.stock?.symbol}</td>

                  <td
                    style={{
                      color:
                        item.transactionType === "BUY"
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.transactionType}
                  </td>

                  <td>{item.quantity}</td>

                  <td>₹ {item.price}</td>

                  <td>₹ {item.totalAmount}</td>

                  <td>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTransaction(item._id)}
                    >
                      Delete
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