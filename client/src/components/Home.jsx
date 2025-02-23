// src/components/Home.jsx
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebaseConfig";
import "./ChatInterface.css";

const Home = () => {
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
    } else {
      // User is signed out
      navigate("/login");
    }
  });

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
