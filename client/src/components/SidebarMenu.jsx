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
        <div className="menu-container" onClick={toggleMenu}>
          <button onClick={toggleMenu} className="menu-button">
            ☰
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/chat">
                <li>Chat</li>
              </Link>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/logout">
                <li>Logout</li>
              </Link>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
