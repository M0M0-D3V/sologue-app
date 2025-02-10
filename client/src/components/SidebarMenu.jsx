import React, { useState } from "react";
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
        <ul>
          <li>Home</li>
          <li>Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
