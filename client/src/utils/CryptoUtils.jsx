// src/utils/cryptoUtils.js
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_FIREBASE_CRYPTO_KEY;

export const encrypt = (message) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  return encryptedMessage;
};

export const decrypt = (encryptedMessage) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
};
