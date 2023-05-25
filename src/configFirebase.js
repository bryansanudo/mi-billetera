import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHVNl_LZjUDFNawaEahvXr1X_vmiuhZE4",
  authDomain: "bryansanudo-cba02.firebaseapp.com",
  projectId: "bryansanudo-cba02",
  storageBucket: "bryansanudo-cba02.appspot.com",
  messagingSenderId: "263720986100",
  appId: "1:263720986100:web:f9d3e067f4acd03fb7c5a1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
