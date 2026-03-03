import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// temporary dummy config (we will replace later)
const firebaseConfig = {
  apiKey: "demo",
  authDomain: "demo",
  projectId: "demo",
  storageBucket: "demo",
  messagingSenderId: "demo",
  appId: "demo",
};

// ✅ prevent duplicate app initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);