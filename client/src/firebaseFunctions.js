// src/firebaseFunctions.js
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const createChatSession = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const chatsCollection = collection(db, "chats");
    const currentTimestamp = new Date().toISOString();
    const chatRef = await addDoc(chatsCollection, {
      title: currentTimestamp,
      createdAt: currentTimestamp,
      userId: user.uid,
    });
    return chatRef.id;
  } catch (e) {
    console.error("Error creating chat session: ", e);
    throw e;
  }
};

export const getChatsByUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const chatsCollection = collection(db, "chats");
    const querySnapshot = await getDocs(chatsCollection);
    const chats = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === user.uid) {
        chats.push({ id: doc.id, ...doc.data() });
      }
    });
    return chats;
  } catch (e) {
    console.error("Error getting chats by user: ", e);
    throw e;
  }
};

export const saveMessageToChat = async (chatId, message) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    if (!message || typeof message !== "object")
      throw new Error("message must be a valid object.");

    const chatRef = doc(db, "chats", chatId);
    const messagesCollection = collection(chatRef, "messages");
    await addDoc(messagesCollection, message);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getMessagesFromChat = async (chatId) => {
  try {
    if (!chatId) throw new Error("chatId is required");

    const messages = [];
    const chatRef = doc(db, "chats", chatId);
    const messagesCollection = collection(chatRef, "messages");
    const querySnapshot = await getDocs(messagesCollection);
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};
