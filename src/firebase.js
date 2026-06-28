import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXj3HFfinU7khRJZppASGAcUiP8Jcq2xc",
  authDomain: "everything-is-safe.firebaseapp.com",
  projectId: "everything-is-safe",
  storageBucket: "everything-is-safe.firebasestorage.app",
  messagingSenderId: "821999099834",
  appId: "1:821999099834:web:a459739df4743468f74783"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;