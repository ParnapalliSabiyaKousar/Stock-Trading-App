import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        📈 TradeX
      </div>

      <div className="links">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/stocks">Markets</Link>

        <Link to="/portfolio">Portfolio</Link>

        <Link to="/watchlist">Watchlist</Link>

      </div>

      <ProfileMenu />

    </nav>
  );
}