import { useState, useEffect } from "react";

import * as firebase from "firebase/app";
import { User } from "firebase/auth";

import { auth } from "./firebase";

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("authUser") || "{}")
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener?.();
  }, [firebase]);

  return { user };
}
