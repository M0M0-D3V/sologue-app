// src/components/Home.jsx
import React from "react";
import "./ChatInterface.css";
import SidebarMenu from "./SidebarMenu";

const Home = () => {
  return (
    <div className="chat-interface">
      <header className="chat-header">
        <SidebarMenu />
        <button classSName="profile-button">👤</button>
      </header>
      <h1>Welcome to SoLogue</h1>
      <p>Have an insightful conversation with yourself!</p>
      <p>Type to get started...</p>

      <label>
        <input type="text" className="text-field" placeholder="Enter text" />
      </label>
    </div>
  );
};

export default Home;
