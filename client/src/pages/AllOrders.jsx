import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./AllOrders.css";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Using transactions as orders
      const res = await axiosInstance.get("/transactions/all");
      setOrders(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const user = order.user?.name || "";
    const stock = order.stock?.symbol || "";

    return (
      user.toLowerCase().includes(search.toLowerCase()) ||
      stock.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div className="orders-page">

        <Sidebar />

        <div className="orders-content">

          <h1>All Orders</h1>

          <input
            className="search-box"
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table>

            <thead>

              <tr>

                <th>User</th>
                <th>Company</th>
                <th>Symbol</th>
                <th>Order</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr key={order._id}>

                  <td>{order.user?.name}</td>

                  <td>{order.stock?.companyName}</td>

                  <td>{order.stock?.symbol}</td>

                  <td>

                    <span
                      className={
                        order.transactionType === "BUY"
                          ? "buy"
                          : "sell"
                      }
                    >
                      {order.transactionType}
                    </span>

                  </td>

                  <td>{order.quantity}</td>

                  <td>₹ {order.price}</td>

                  <td>₹ {order.totalAmount}</td>

                  <td>

                    <span className="completed">
                      Completed
                    </span>

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

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