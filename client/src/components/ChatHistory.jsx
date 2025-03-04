import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteChatById,
  getChatsByUser,
  updateChatTitleById,
} from "../firebaseFunctions";
import UseViewHeight from "../hooks/UseViewHeight";
import "./ChatInterface.css";

const ChatHistory = ({ setChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editChat, setEditChat] = useState(null);
  const [chatTitle, setChatTitle] = useState("");
  const viewHeight = UseViewHeight();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatList = await getChatsByUser();
        if (!chatList || chatList.length === 0) {
          setChats([]);
          return;
        }
        // Sort chats by createdAt timestamp
        chatList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setChats(chatList);
      } catch (error) {
        console.error("Error fetching chat history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (chat) => {
    // Functionality to edit chat title
    setEditChat(chat.id);
    setChatTitle(chat.title);
    console.log("Edit chat with ID:", chat.id);
  };

  const handleUpdate = async (chatId) => {
    try {
      if (!chatTitle || chatTitle.trim() === "") {
        alert("Chat title cannot be empty.");
        return;
      }
      await updateChatTitleById(chatId, chatTitle);
      setChats(
        chats.map((chat) =>
          chat.id === chatId ? { ...chat, title: chatTitle } : chat
        )
      );
      setEditChat(null);
    } catch (e) {
      console.error("Error updating chat title: ", e);
    }
  };
  const handleCancelEdit = () => {
    setEditChat(null);
    setChatTitle("");
  };
  const handleInputChange = (e) => {
    setChatTitle(e.target.value);
  };

  const handleDelete = async (chatId) => {
    try {
      await deleteChatById(chatId);
      setChats(chats.filter((chat) => chat.id !== chatId));
    } catch (e) {
      console.error("Error deleting chat: ", e);
    }
    console.log("Delete chat with ID:", chatId);
  };

  return (
    <div className="chat-history" style={{ height: viewHeight }}>
      <h2>Chat History</h2>
      {chats.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="">
              {editChat === chat.id ? (
                <div className="df jcsb">
                  <input
                    className="text-field"
                    type="text"
                    value={chatTitle}
                    onChange={handleInputChange}
                    placeholder="Edit chat title"
                  />
                  <div>
                    <button onClick={() => handleUpdate(chat.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="df jcsb">
                  <Link
                    to={`/chat/${chat.id}`}
                    onClick={() => setChatId(chat.id)}
                  >
                    {chat.title}
                  </Link>
                  <div>
                    <button onClick={() => handleEdit(chat)}>Edit</button>
                    <button onClick={() => handleDelete(chat.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
