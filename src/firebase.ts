import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as db from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useObjectVal } from "react-firebase-hooks/database";

import {
  UserData,
  RoundData,
  Company,
  CompanyUID,
  Team,
  TeamUID,
  Status,
} from "./schemes";

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

export async function findUser(uid: string): Promise<UserData> {
  const usersRef = db.ref(database, "/users");
  const snapshot = await db.get(usersRef);

  return snapshot.val()[uid];
}

export async function findTeam(teamUID: TeamUID): Promise<Team> {
  const teamRef = db.ref(database, `/teams/${teamUID}`);
  const snapshot = await db.get(teamRef);

  return snapshot.val() as Team;
}

const functions = getFunctions(app);

export type RegisterParams = {
  uid: string;
  data: UserData;
};
export type RegisterResult = void;
export const registerUser = httpsCallable<RegisterParams, RegisterResult>(
  functions,
  "registerUser"
);

export type InvestParams = {
  round: number;
  teamUID: string;
  companyUID: string;
  investAmount: number;
};
export type InvestResult =
  | "auth_fail"
  | "team_mismatch"
  | "invalid_param"
  | "insufficient_cash"
  | "success";
export const invest = httpsCallable<InvestParams, InvestResult>(
  functions,
  "invest"
);

export function useCompaniesDB(): Record<CompanyUID, Company> | null {
  const companiesRef = db.ref(database, "/companies");
  const [record] = useObjectVal<Record<CompanyUID, Company>>(companiesRef);
  return record ?? null;
}

export function useStatusDB(): Status | null {
  const statusRef = db.ref(database, "/status");
  const [status] = useObjectVal<Status>(statusRef);
  return status ?? null;
}

export function useRoundDataDB(): Record<number, RoundData> | null {
  const roundRef = db.ref(database, "/rounds");
  const [roundData] = useObjectVal<Record<number, RoundData>>(roundRef);
  return roundData ?? null;
}

export function useInvestDataDB(teamUID: TeamUID): {
  amount: Record<CompanyUID, number>;
  result: Record<CompanyUID, number>;
}[] {
  const final = [];

  for (let round = 0; round <= 3; round++) {
    const investAmountRef = db.ref(
      database,
      `/rounds/${round}/investAmount/${teamUID}`
    );
    const [investAmount] =
      useObjectVal<Record<CompanyUID, number>>(investAmountRef);

    const investResultRef = db.ref(
      database,
      `/rounds/${round}/investResult/${teamUID}`
    );
    const [investResult] =
      useObjectVal<Record<CompanyUID, number>>(investResultRef);

    final.push({ amount: investAmount ?? {}, result: investResult ?? {} });
  }

  return final;
}

export function useValuationDB(
  round: number
): Record<CompanyUID, number> | null {
  const valuationRef = db.ref(database, `/rounds/${round}/valuation`);
  const [valuationData] =
    useObjectVal<Record<CompanyUID, number>>(valuationRef);
  return valuationData ?? null;
}

export function useTeam(teamUID: TeamUID): Team | null {
  const teamRef = db.ref(database, `/teams/${teamUID}`);
  const [team] = useObjectVal<Team>(teamRef);
  return team ?? null;
}
