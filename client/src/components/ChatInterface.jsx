//  src/components/ChatInterface.jsx
import React, { useState } from "react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    // Add new message to the message array
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="chat-interface">
      <header className="chat-header">
        <button className="menu-button">☰</button>
        <button classSName="profile-button">👤</button>
      </header>
      <main className="text-response">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </main>
      <footer className="chat-footer">
        <button className="talk-button">Talk</button>
        <input
          type="text"
          className="text-field"
          placeholder="Enter text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="enter-text-button" onClick={handleSendMessage}>
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatInterface;
