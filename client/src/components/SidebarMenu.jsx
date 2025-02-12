import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarMenu.css";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <button onClick={toggleMenu} className="menu-button">
        ☰
      </button>
      <div className={`sidebar-menu ${isOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className="menu-button">
          ☰
        </button>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
