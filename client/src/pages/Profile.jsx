import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../components/axiosInstance";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    wallet: 0,
    role: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await axiosInstance.put(`/users/${user._id}`, {
        name: user.name,
        phone: user.phone,
        address: user.address,
      });

      alert("Profile Updated Successfully");
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <Sidebar />

        <div className="profile-content">

          <h1>My Profile</h1>

          <div className="profile-card">

            <div className="avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={user.name}
                disabled={!editing}
                onChange={handleChange}
              />

              <label>Email</label>

              <input
                type="email"
                value={user.email}
                disabled
              />

              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                disabled={!editing}
                onChange={handleChange}
              />

              <label>Address</label>

              <textarea
                name="address"
                value={user.address}
                disabled={!editing}
                onChange={handleChange}
              />

              <label>Wallet Balance</label>

              <input
                type="text"
                value={`₹ ${user.wallet}`}
                disabled
              />

              <label>Role</label>

              <input
                type="text"
                value={user.role}
                disabled
              />

              {editing ? (
                <button
                  className="save-btn"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}