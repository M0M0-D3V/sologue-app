//  src/components/ChatInterface.jsx
import React, { useState } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    // Add new message to the message array
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInterface;
