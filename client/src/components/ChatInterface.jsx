//  src/components/ChatInterface.jsx
import React, { useEffect, useState } from "react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isName1, setIsName1] = useState(true);
  const [name1, setName1] = useState("Me");
  const [name2, setName2] = useState("Other Me");

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: isName1 ? name1 : name2,
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleToggle = () => {
    setIsName1(!isName1);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // update dom for custom names
    document.documentElement.style.setProperty("--name1", name1);
    document.documentElement.style.setProperty("--name2", name2);
  }, [name1, name2]);

  return (
    <div className="chat-interface">
      <main className="text-response">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}:</strong>
            <br />
            {message.text}
          </div>
        ))}
      </main>
      <div className="toggle-button-container">
        <div className="name-inputs">
          <input
            type="text"
            placeholder="Enter name 1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter name 2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
        <div className="toggle-button" onClick={handleToggle}>
          <div className="btn btn-rect" id="button-13">
            <input
              type="checkbox"
              className="checkbox"
              checked={!isName1}
              readOnly
            />
            <div className="knob">
              {isName1 ? name1 : name2}
              <span></span>
            </div>
            <div className="btn-bg"></div>
          </div>
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
          onKeyDown={handlePressEnter}
        />
        <button className="enter-text-button" onClick={handleSendMessage}>
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatInterface;
