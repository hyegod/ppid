
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbKweglDuqAZNpz2QDqS8c8dFA-z96mAs",
  authDomain: "app-ppid-info.firebaseapp.com",
  projectId: "app-ppid-info",
  storageBucket: "app-ppid-info.appspot.com",
  messagingSenderId: "979351977474",
  appId: "1:979351977474:web:44febf8eaa577b6754311b",
  measurementId: "G-NLDB6YKMHV"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP); // Inisialisasi Firestore
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); 
