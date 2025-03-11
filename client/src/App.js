import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ChatHistory from "./components/ChatHistory";
import ChatInterface from "./components/ChatInterface";
import "./components/ChatInterface.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import SidebarMenu from "./components/SidebarMenu";
import Signup from "./components/Signup";
import { auth } from "./firebaseConfig";
import UseViewHeight from "./hooks/UseViewHeight";

const App = () => {
  const [user, setUser] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState("");

  const viewHeight = UseViewHeight();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      setUser(true);
    } else {
      // User is signed out
    }
  });

  return (
    <Router>
      <div className="App" style={{ height: viewHeight }}>
        <header className="chat-header">
          {user ? (
            <>
              <SidebarMenu setChatId={setChatId} setChatTitle={setChatTitle} />
              {chatTitle !== "" ? <h1>{chatTitle}</h1> : null}
              <h4>Welcome, {auth.currentUser.displayName}</h4>
            </>
          ) : null}
        </header>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                setChatId={setChatId}
                setChatTitle={setChatTitle}
                viewHeight={viewHeight}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat/:id"
            element={
              <ChatInterface
                chatId={chatId}
                chatTitle={chatTitle}
                viewHeight={viewHeight}
              />
            }
          />
          <Route
            path="/history"
            element={
              <ChatHistory
                setChatId={setChatId}
                chatTitle={chatTitle}
                setChatTitle={setChatTitle}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
