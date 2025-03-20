// src/firebaseFunctions.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { decrypt, encrypt } from "./utils/CryptoUtils";

export const checkAndCreateUserDocument = async () => {
  const user = auth.currentUser;

  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  try {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || null,
        lastChatId: user.lastChatId || null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await setDoc(userRef, userData);
    } else {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.error("Error checking user document: ", e);
    throw e;
  }
};

export const getUserDocument = async () => {
  const user = auth.currentUser;

  if (!user.uid) return null;
  const userRef = doc(db, "users", user.uid);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting user document: ", e);
    throw e;
  }
};

export const createChatSession = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const chatsCollection = collection(db, "chats");
    const currentTimestamp = new Date().toISOString();
    const chatRef = await addDoc(chatsCollection, {
      title: formatDate(currentTimestamp),
      createdAt: currentTimestamp,
      userId: user.uid,
    });

    // fetch the newly created chat doc and return it
    const chatSnapshot = await getDoc(chatRef);
    return { id: chatRef.id, ...chatSnapshot.data() };
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

export const getLastChatId = async () => {
  try {
    const user = auth.currentUser;
    const userData = await getUserDocument(user.uid);
    if (userData !== null) {
      return userData.lastChatId;
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting lastChatId by user:", e);
    throw e;
  }
};

export const updateLastChatId = async (chatId) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { lastChatId: chatId });
  } catch (e) {
    console.error("Error updating lastChatId:", e);
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

export const getChatById = async (chatId) => {
  try {
    if (!chatId) throw new Error("chatId is required");
    const chatRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(chatRef);
    if (!docSnap.exists()) throw new Error("Chat not found.");
    const chatData = docSnap.data();
    const formattedChatData = {
      id: docSnap.id,
      title: chatData.title || "Untitled",
      createdAt: chatData.createdAt
        ? formatDate(chatData.createdAt) +
          " at " +
          formatTime(chatData.createdAt)
        : "Unknown",
      userId: chatData.userId || "Unknown",
    };
    return formattedChatData;
  } catch (e) {
    console.error("Error getting chat document: ", e);
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
        const decryptedMessage = {
          ...message,
          text: decrypt(message.text),
          time: formatTime(message.timestamp),
          date: formatDate(message.timestamp),
        };
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

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) throw new Error("User document not found");
    const userData = userDoc.data();
    const formattedUserData = {
      id: userDoc.id,
      displayName: userData.displayName || "Anonymous",
      email: userData.email || "No email provided",
      photoURL: userData.photoURL || null,
      createdAt: userData.createdAt ? userData.createdAt : "Unknown",
      lastLogin: userData.lastLogin
        ? formatDate(userData.lastLogin) +
          " at " +
          formatTime(userData.lastLogin)
        : "Unknown",
    };
    console.log("User profile fetched successfully");
    return formattedUserData;
  } catch (e) {
    console.error("Error getting user profile: ", e);
    throw e;
  }
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  // Extract hours, minutes, and seconds
  let hours = date.getHours().toString().padStart(2, "0");
  let sign = "AM";
  if (hours > 12) {
    hours -= 12;
    sign = "PM";
  }
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Combine into desired formats
  return `${hours}:${minutes} ${sign}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
};
