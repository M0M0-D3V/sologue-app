//  src/components/ChatInterface.jsx
import React, { useState } from "react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="chat-interface">
      <main className="text-response">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </main>
      <div class="toggle-button">
        <div class="btn btn-rect" id="button-13">
          <input type="checkbox" class="checkbox" />
          <div class="knob">
            <span></span>
          </div>
          <div class="btn-bg"></div>
        </div>
      </div>
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
