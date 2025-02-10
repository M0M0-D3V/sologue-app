import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ChatInterface from "./components/ChatInterface";
import "./components/ChatInterface.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SidebarMenu from "./components/SidebarMenu";

const App = () => {
  return (
    <Router>
      <div className="chat-interface App">
        <header className="chat-header">
          <SidebarMenu />
          <button classSName="profile-button">👤</button>
        </header>
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
