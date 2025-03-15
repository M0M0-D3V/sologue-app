import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createChatSession, updateLastChatId } from "../firebaseFunctions";

const CreateNewChat = ({ setChatId, setChatTitle }) => {
  const navigate = useNavigate();

  const handleCreateNewChat = async () => {
    try {
      const newChat = await createChatSession();
      setChatId(newChat.id);
      setChatTitle(newChat.title);
      await updateLastChatId(newChat.id);
      navigate(`/chat/${newChat.id}`);
    } catch (e) {
      console.error("Error starting chat session: ", e);
    }
  };

  return (
    <div>
      <Link onClick={handleCreateNewChat}>Create New Chat</Link>
    </div>
  );
};

export default CreateNewChat;
