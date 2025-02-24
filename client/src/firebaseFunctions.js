// src/firebaseFunctions.js
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const messagesCollection = collection(db, "messages");

export const saveMessage = async (message) => {
  try {
    await addDoc(messagesCollection, message);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getMessages = async () => {
  const messages = [];
  const querySnapshot = await getDocs(messagesCollection);
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...doc.data() });
  });
  return messages;
};
