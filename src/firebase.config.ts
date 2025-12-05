/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID,
  databaseURL: env.VITE_DB_URL,
};

const app = initializeApp(firebaseConfig);

export default app;
