// src/components/Home.jsx
import React from "react";
import "./ChatInterface.css";

const Home = () => {
  return (
    <div className="chat-interface">
      <h1>Welcome to SoLogue</h1>
      <p>Have an insightful conversation with yourself!</p>
      <p>Type to get started...</p>
      <footer className="chat-footer">
        <button>Meow</button>
        <input type="text" className="text-field" placeholder="Enter text" />
        <button className="enter-text-button">Send</button>
      </footer>
    </div>
  );
};

export default Home;
