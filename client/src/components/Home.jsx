// src/components/Home.jsx
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./ChatInterface.css";
import CreateNewChat from "./CreateNewChat";
import "./Home.css";

const Home = ({ setChatId, setChatTitle, viewHeight }) => {
  const adjustedHeight = viewHeight - 81;

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
    <div className="chat-interface" style={{ height: adjustedHeight }}>
      <h2>Have an insightful conversation with yourself!</h2>
      <div className="chat-history">
        <h3>Start a new chat or continue an existing one.</h3>
        <div className="df ac">
          <Link to="/history" onClick={() => setChatTitle("Chat History")}>
            <button>Chat History</button>
          </Link>
          <CreateNewChat setChatId={setChatId} />
        </div>
      </div>
      <section className="updates-section">
        <h2 className="updates-title">Latest Updates</h2>
        <div className="updates-list">
          <div className="update-card">
            <h3 className="update-header">Small Quality of Life Changes..</h3>
            <p className="update-description">
              We've made some small quality of life changes to improve your
              experience. Enjoy a slightly smoother and slightly more intuitive
              interface! More little things to come!
            </p>
            <span className="update-date">March 11, 2025</span>
          </div>
          <div className="update-card">
            <h3 className="update-header">New Feature: Edit/Delete Messages</h3>
            <p className="update-description">
              You can now edit and delete messages in chat!
            </p>
            <span className="update-date">March 6, 2025</span>
          </div>
          <div className="update-card">
            <h3 className="update-header">New Feature: Chat Privacy</h3>
            <p className="update-description">
              Messages are now encrypted and only visible to you!
            </p>
            <p className="update-description">
              However... previous chats will no longer appear so please create a
              new chat.
            </p>
            <span className="update-date">March 5, 2025</span>
          </div>
          <div className="update-card">
            <h3 className="update-header">🐛 Bug Fix: Scroll Glitch</h3>
            <p className="update-description">
              Fixed the issue where scrolling would not stay at the bottom in
              chat!
            </p>
            <span className="update-date">March 4, 2025</span>
          </div>
          <div className="update-card">
            <h3 className="update-header">Announcement: Feedback Needed</h3>
            <p className="update-description">
              Would love your ideas! Share your thoughts on new features you’d
              like to see in Sologue. You know where to find me.
            </p>
            <span className="update-date">March 1, 2025</span>
          </div>
        </div>
      </section>
      <footer className="chat-footer">
        {/* <button>Meow</button>
        <input type="text" className="text-field" placeholder="Enter text" />
        <button className="enter-text-button">Send</button> */}
      </footer>
    </div>
  );
};

export default Home;
