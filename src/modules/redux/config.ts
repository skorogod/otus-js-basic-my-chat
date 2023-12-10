import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFr2g7-D2URTQfkicZ27amExa5WdTDpso",
  authDomain: "otus-redux-chat.firebaseapp.com",
  databaseURL: "https://otus-redux-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "otus-redux-chat",
  storageBucket: "otus-redux-chat.appspot.com",
  messagingSenderId: "427000396124",
  appId: "1:427000396124:web:7b4dcf33c5ae161cf4a999",
  measurementId: "G-MJVP7J9EKP",
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
