import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <span className="title">netflix</span>
        <input
          className="input-search"
          type="text"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

export default Navbar;
