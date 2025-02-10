// src/components/Home.jsx
import React from "react";
import "./ChatInterface.css";

const Home = () => {
  return (
    <div className="chat-interface">
      <h1>Welcome to SoLogue</h1>
      <p>Have an insightful conversation with yourself!</p>
      <p>Type to get started...</p>
      <div class="toggle-button">
        <div class="btn btn-rect" id="button-13">
          <input type="checkbox" class="checkbox" />
          <div class="knob">
            <span></span>
          </div>
          <div class="btn-bg"></div>
        </div>
      </div>
      <label>
        <input type="text" className="text-field" placeholder="Enter text" />
      </label>
    </div>
  );
};

export default Home;
