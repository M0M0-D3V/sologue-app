import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChatsByUser } from "../firebaseFunctions";

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
  return (
    <div className="chat-history">
      <h2>Chat History</h2>
      {chats.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link to={`/chat/${chat.id}`} onClick={() => setChatId(chat.id)}>
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
