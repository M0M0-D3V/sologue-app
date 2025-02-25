import React from "react";
import { useNavigate } from "react-router";
import { createChatSession } from "../firebaseFunctions";

const CreateNewChat = ({ setChatId }) => {
  const navigate = useNavigate();

  const handleCreateNewChat = async () => {
    try {
      const newChatId = await createChatSession(new Date().toISOString());
      setChatId(newChatId);
      navigate(`/chat/${newChatId}`);
    } catch (e) {
      console.error("Error starting chat session: ", e);
    }
  };

  return (
    <div>
      <button onClick={handleCreateNewChat}>Create New Chat</button>
    </div>
  );
};

export default CreateNewChat;
