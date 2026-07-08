import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./Users.css";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await axiosInstance.delete(`/users/${id}`);

      fetchUsers();

    } catch (err) {

      alert(err.response?.data?.message);

    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="users-page">

        <Sidebar />

        <div className="users-content">

          <h1>Users Management</h1>

          <input
            className="search-box"
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Wallet</th>
                <th>Role</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>₹ {user.wallet}</td>

                  <td>{user.role}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
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