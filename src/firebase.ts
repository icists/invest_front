import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMZh9vXL5Ga8T-ZAw9WpNBGOd_EF7jWKU",
  authDomain: "investment-game-e04fb.firebaseapp.com",
  databaseURL:
    "https://investment-game-e04fb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "investment-game-e04fb",
  storageBucket: "investment-game-e04fb.appspot.com",
  messagingSenderId: "726265075186",
  appId: "1:726265075186:web:f2317cf4fb53805ac3076b",
  measurementId: "G-696KX4HTFQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/*
export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
*/
