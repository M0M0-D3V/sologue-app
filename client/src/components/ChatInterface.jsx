//  src/components/ChatInterface.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteMessageById,
  loadMessagesWithListener,
  saveMessageToChat,
  updateMessageById,
} from "../firebaseFunctions";
import "./ChatInterface.css";

const ChatInterface = ({ chatId, setChatId, chatTitle, viewHeight }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isName1, setIsName1] = useState(true);
  const [name1, setName1] = useState("Me");
  const [name2, setName2] = useState("Other Me");
  const [editMessage, setEditMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  const bottomRef = useRef(null);
  const adjustedHeight = viewHeight - 81; // Adjust the height to account for the header and footer

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadNames = () => {
    let len = messages.length;
    for (let i = len - 1; i >= 0; i--) {
      if (!messages[i].isOtherMe) {
        setName1(messages[i].sender);
        console.log(`name1 set to: ${messages[i].sender}`);
        break;
      }
    }
    for (let i = len - 1; i >= 0; i--) {
      if (messages[i].isOtherMe) {
        setName2(messages[i].sender);
        console.log(`name2 set to: ${messages[i].sender}`);
        break;
      }
    }
  };

  useEffect(() => {
    setChatId(id);
    const unsubscribe = loadMessagesWithListener(id, setMessages);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
    loadNames();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() && chatId) {
      const newMessage = {
        text: input,
        sender: isName1 ? name1 : name2,
        timestamp: new Date().toISOString(),
        isOtherMe: !isName1,
      };
      setMessages([...messages, newMessage]);
      try {
        await saveMessageToChat(chatId, newMessage); // Save message to Firebase
      } catch (e) {
        console.error("Error saving message: ", e);
      }
      setInput("");
    }
  };

  const handleToggle = () => {
    setIsName1(!isName1);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      // Insert new line character at the cursor position
      const { selectionStart, selectionEnd } = e.target;
      const newValue =
        input.substring(0, selectionStart) +
        "\n" +
        input.substring(selectionEnd);
      setInput(newValue);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // useEffect(() => {
  //   // update dom for custom names
  //   document.documentElement.style.setProperty("--name1", name1);
  //   document.documentElement.style.setProperty("--name2", name2);
  // }, [name1, name2]);

  const handleEdit = (message) => {
    setEditMessage(message.id);
    setMessageText(message.text);
    console.log("Edit message with ID: ", message.id);
  };

  const handleUpdate = async (message) => {
    try {
      if (!messageText || messageText.trim() === "") {
        alert("Message cannot be empty.");
        return;
      }
      const updatedMessage = { ...message, text: messageText };
      await updateMessageById(chatId, message.id, updatedMessage);
      setMessages(
        messages.map((m) => (m.id === message.id ? updatedMessage : m))
      );
      setEditMessage(null);
    } catch (e) {
      console.error("Error updating message: ", e);
    }
  };
  const handleCancelEdit = () => {
    setEditMessage(null);
    setMessageText("");
  };
  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessageById(chatId, messageId);
      setMessages(messages.filter((message) => message.id !== messageId));
    } catch (e) {
      console.error("Error deleting message: ", e);
    }
  };

  return (
    <div className="chat-interface" style={{ height: adjustedHeight }}>
      <main className="text-response">
        {messages.map((message, index) => (
          <div key={index} className="">
            {editMessage === message.id ? (
              <div className="message-container">
                <textarea
                  className="edit-message"
                  value={messageText}
                  onChange={handleInputChange}
                />
                <div>
                  <button onClick={() => handleUpdate(message)}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="message-container">
                  <div
                    className={
                      message.sender === name1
                        ? "message name1"
                        : "message name2"
                    }
                  >
                    <strong>{message.sender}: </strong>
                    {message.text.split("\n").map((line, i) => (
                      <p className="message-text">
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      </p>
                    ))}
                    <em className="message-time">{message.time}</em>
                  </div>
                  <div
                    className={
                      message.sender === name1
                        ? "message-buttons1"
                        : "message-buttons2"
                    }
                  >
                    <button onClick={() => handleEdit(message)}>Edit</button>
                    <button onClick={() => handleDelete(message.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
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
            <div className={isName1 ? "knob df ac jcfs" : "knob df ac jcfe"}>
              <p>{isName1 ? name1 : name2}</p>
              <span></span>
              <div className="btn-bg"></div>
            </div>
          </div>
        </div>
      </div>
      <footer className="chat-footer">
        <button className="talk-button">Talk</button>
        <textarea
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
