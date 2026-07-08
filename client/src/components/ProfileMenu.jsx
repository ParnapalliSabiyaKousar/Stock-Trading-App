import React, { useState } from "react";
import "./ProfileMenu.css";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem("username") || "Sabiya";
  const email = localStorage.getItem("email") || "user@email.com";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="profile-menu">

      <div
        className="profile-button"
        onClick={() => setOpen(!open)}
      >

        <div className="avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <span>{username}</span>

      </div>

      {open && (

        <div className="dropdown">

          <h3>{username}</h3>

          <p>{email}</p>

          <hr />

          <button>My Profile</button>

          <button>Settings</button>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      )}

    </div>
  );
}