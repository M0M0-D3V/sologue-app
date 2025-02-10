import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ChatInterface from "./components/ChatInterface";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
