// src/firebaseFunctions.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { decrypt, encrypt } from "./utils/CryptoUtils";

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

export const updateChatTitleById = async (chatId, newTitle) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    if (!newTitle || typeof newTitle !== "string")
      throw new Error("newTitle must be a valid string.");

    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, { title: newTitle });
  } catch (e) {
    console.error("Error updating chat title: ", e);
    throw e;
  }
};

export const deleteChatById = async (chatId) => {
  try {
    if (!chatId) throw new Error("chatId is required");

    const chatRef = doc(db, "chats", chatId);
    await deleteDoc(chatRef);
  } catch (e) {
    console.error("Error deleting chat: ", e);
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
    const encryptedMessage = { ...message, text: encrypt(message.text) };
    // await addDoc(messagesCollection, message);
    await addDoc(messagesCollection, encryptedMessage);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const loadMessagesWithListener = (chatId, setMessages) => {
  try {
    if (!chatId) throw new Error("chatId is required");

    const chatRef = doc(db, "chats", chatId);
    const messagesCollection = collection(chatRef, "messages");
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        const decryptedMessage = { ...message, text: decrypt(message.text) };
        messages.push({ id: doc.id, ...decryptedMessage });
      });
      setMessages(messages);
    });
    return unsubscribe;
  } catch (e) {
    console.error("Error loading messages with listener: ", e);
    throw e;
  }
};

export const getMessagesFromChat = async (chatId) => {
  try {
    if (!chatId) throw new Error("chatId is required");

    const messages = [];
    const chatRef = doc(db, "chats", chatId);
    const messagesCollection = collection(chatRef, "messages");
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(messagesQuery);
    querySnapshot.forEach((doc) => {
      const message = doc.data();
      const decryptedMessage = { ...message, text: decrypt(message.text) };
      // messages.push({ id: doc.id, ...doc.data() });
      messages.push({ id: doc.id, ...decryptedMessage });
    });
    return messages;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

export const getMessageById = async (chatId, messageId) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    if (!messageId) throw new Error("messageId is required");

    const chatRef = doc(db, "chats", chatId);
    const messageRef = doc(chatRef, "messages", messageId);
    const docSnap = await getDocs(messageRef);
    if (!docSnap.exists()) throw new Error("Message not found.");
    const message = docSnap.data();
    const decryptedMessage = { ...message, text: decrypt(message.text) };
    return { id: docSnap.id, ...decryptedMessage };
    // return { id: docSnap.id, ...docSnap.data() };
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
};

export const deleteMessageById = async (chatId, messageId) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    if (!messageId) throw new Error("messageId is required");

    const chatRef = doc(db, "chats", chatId);
    const messageRef = doc(chatRef, "messages", messageId);
    await deleteDoc(messageRef);
  } catch (e) {
    console.error("Error deleting message: ", e);
    throw e;
  }
};

export const updateMessageById = async (chatId, messageId, newMessage) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    if (!messageId) throw new Error("messageId is required");
    if (!newMessage || typeof newMessage !== "object")
      throw new Error("newMessage must be a valid object.");

    const chatRef = doc(db, "chats", chatId);
    const messageRef = doc(chatRef, "messages", messageId);
    const encryptNewMessage = { ...newMessage, text: encrypt(newMessage.text) };
    // await updateDoc(messageRef, newMessage);
    await updateDoc(messageRef, encryptNewMessage);
  } catch (e) {
    console.error("Error updating message: ", e);
    throw e;
  }
};

export const getUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const { displayName, email, photoURL } = user;
    return { displayName, email, photoURL };
  } catch (e) {
    console.error("Error getting user profile: ", e);
    throw e;
  }
};
