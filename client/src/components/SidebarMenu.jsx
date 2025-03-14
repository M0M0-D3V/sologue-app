import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateNewChat from "./CreateNewChat";
import "./SidebarMenu.css";

const SidebarMenu = ({ setChatId, setChatTitle }) => {
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
              <Link to="/home" onClick={() => setChatTitle("SoLogue")}>
                <li>Home</li>
              </Link>
              <li>
                <CreateNewChat
                  setChatId={setChatId}
                  setChatTitle={setChatTitle}
                />
              </li>
              <Link to="/history" onClick={() => setChatTitle("Chat History")}>
                <li>Chat History</li>
              </Link>
              <Link to="/profile" onClick={() => setChatTitle("Profile")}>
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
