import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ChatInterface from "./components/ChatInterface";
import "./components/ChatInterface.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import SidebarMenu from "./components/SidebarMenu";
import Signup from "./components/Signup";
import { auth } from "./firebaseConfig";

const App = () => {
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is signed out
      navigate("/login");
    } else {
      // User is signed in, see docs for a list of available properties
    }
  });

  return (
    <Router>
      <div className="chat-interface App">
        <header className="chat-header">
          <SidebarMenu />
        </header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
