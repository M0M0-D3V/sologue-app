import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteChatById, getChatsByUser } from "../firebaseFunctions";
import "./ChatInterface.css";

const ChatHistory = ({ setChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = (chatId) => {
    // Functionality to edit chat title
    console.log("Edit chat with ID:", chatId);
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
    <div className="chat-history">
      <h2>Chat History</h2>
      {chats.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="df jcsa">
              <Link to={`/chat/${chat.id}`} onClick={() => setChatId(chat.id)}>
                {chat.title}
              </Link>
              <div>
                <button>Edit</button>
                <button onClick={() => handleDelete(chat.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
