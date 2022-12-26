import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as db from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

import { UserData, RoundData, Company, CompanyUID } from "./schemes";

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

const database = db.getDatabase(app);

export async function findUser(uid: string): Promise<UserData | null> {
  const usersRef = db.ref(database, "/users");
  const snapshot = await db.get(usersRef);

  let result: UserData | null = null;
  snapshot.forEach((user) => {
    if (user.key === uid) {
      result = user.val() as UserData;
    }
  });

  return result;
}

export async function registerUser(uid: string, data: UserData) {
  const userRef = db.ref(database, "/users/" + uid);
  db.set(userRef, data);

  const memberRef = db.ref(database, "/teams/" + data.team + "/members/" + uid);
  db.set(memberRef, true);
}

export function useCompanies(): [
  [CompanyUID, Company][] | undefined,
  boolean,
  Error | undefined
] {
  const companiesRef = db.ref(database, "/companies");
  const [record, loading, error] =
    useObjectVal<Record<CompanyUID, Company>>(companiesRef);
  return [
    record
      ? Object.entries(record as Record<CompanyUID, Company>).sort()
      : undefined,
    loading,
    error,
  ];
}

export function useCurrentRound(): [
  number | undefined,
  boolean,
  Error | undefined
] {
  const roundRef = db.ref(database, "/status/currentRound");
  return useObjectVal(roundRef);
}

export function useRoundData(): [
  Record<number, RoundData> | undefined,
  boolean,
  Error | undefined
] {
  const roundRef = db.ref(database, "/rounds");
  return useObjectVal(roundRef);
}
