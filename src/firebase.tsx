import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCrmnEm8rytBXg7_eu-X0IyMm8ZgCjTREU",
  authDomain: "theartsdiary-25cf4.firebaseapp.com",
  projectId: "theartsdiary-25cf4",
  storageBucket: "theartsdiary-25cf4.appspot.com",
  messagingSenderId: "529471091596",
  appId: "1:529471091596:web:725edf554a0428f5db9ca9",
  measurementId: "G-1HEN6GC4GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };