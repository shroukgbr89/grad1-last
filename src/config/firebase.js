import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD7x2Q1oq8_aYrstmF-6SOkb99njNYMY_A",
  authDomain: "grad-545d4.firebaseapp.com",
  projectId: "grad-545d4",
  storageBucket: "grad-545d4.appspot.com",
  messagingSenderId: "1084808501135",
  appId: "1:1084808501135:web:66f5a2ead9979175c81dfa",
  measurementId: "G-T3FYDKKGJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export { app, analytics, db, messaging };