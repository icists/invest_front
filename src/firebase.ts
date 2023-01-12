import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as db from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useObjectVal as useObjectValLib } from "react-firebase-hooks/database";

import {
  UserData,
  Company,
  CompanyUID,
  Team,
  TeamUID,
  Status,
  EventStatus,
  ValidRoundNumber,
} from "./schemes";

const firebaseConfig = {
  apiKey: "AIzaSyDMZh9vXL5Ga8T-ZAw9WpNBGOd_EF7jWKU",
  authDomain: "investment-game-e04fb.firebaseapp.com",
  databaseURL:
    "https://investment-game-e04fb-default-rtdb.asia-southeast1.firebasedatabase.app",
  // "https://investment-game-test.asia-southeast1.firebasedatabase.app/",
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
  const userRef = db.ref(database, `/users/${uid}`);
  const snapshot = await db.get(userRef);

  return snapshot.val();
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
export type RegisterResult = boolean;
export const registerUser = httpsCallable<RegisterParams, RegisterResult>(
  functions,
  "registerUser"
);

export type InvestParams = {
  round: number;
  teamUID: TeamUID;
  companyUID: CompanyUID;
  investAmount: number;
};
export type InvestResult =
  | "auth_fail"
  | "simultaneous_action"
  | "team_mismatch"
  | "invalid_param"
  | "insufficient_cash"
  | "excess_ratio"
  | "not_investable"
  | "success";
export const invest = httpsCallable<InvestParams, InvestResult>(
  functions,
  "invest"
);

function recordToMap<K extends string | number | symbol, V>(
  r: Record<K, V> | null
): Map<K, V> | null {
  if (r === null) return null;

  const result = new Map<K, V>();
  for (const [key, value] of Object.entries(r)) {
    result.set(key as K, value as V);
  }
  return result;
}

function useObjectVal<T>(query: db.Query): T | null {
  const [value] = useObjectValLib<T>(query);
  return value ?? null;
}

export function useCompaniesDB(): Map<CompanyUID, Company> | null {
  const companiesRef = db.ref(database, "/companies");
  const companies = useObjectVal<Record<CompanyUID, Company>>(companiesRef);
  return recordToMap(companies);
}

export function useStatusDB(): Status | null {
  const statusRef = db.ref(database, "/status");
  const status = useObjectVal<Status>(statusRef);
  return status ?? null;
}

export function useAccountDB(round: number): Map<TeamUID, number> | null {
  const accountRef = db.ref(database, `/rounds/${round}/account`);
  const account = useObjectVal<Record<TeamUID, number>>(accountRef);
  return recordToMap(account);
}

export function useInvestDataDB(teamUID: TeamUID): Record<
  ValidRoundNumber,
  {
    amount: Map<CompanyUID, number>;
    result: Map<CompanyUID, number>;
  }
> {
  const final: any = {};

  for (let round = 0; round <= 3; round++) {
    const investAmountRef = db.ref(
      database,
      `/rounds/${round}/investAmount/${teamUID}`
    );
    const investAmount =
      useObjectVal<Record<CompanyUID, number>>(investAmountRef);

    const investResultRef = db.ref(
      database,
      `/rounds/${round}/investResult/${teamUID}`
    );
    const investResult =
      useObjectVal<Record<CompanyUID, number>>(investResultRef);

    final[round] = {
      amount: recordToMap(investAmount) ?? new Map(),
      result: recordToMap(investResult) ?? new Map(),
    };
  }

  return final;
}

export function useTeamDB(teamUID: TeamUID): Team | null {
  const teamRef = db.ref(database, `/teams/${teamUID}`);
  const team = useObjectVal<Team>(teamRef);

  console.log(team?.track);
  if (team !== null && team.track !== undefined && !(team.track instanceof Map)) {
     const result = new Map<number, CompanyUID>;
     for (const [key, value] of Object.entries(team.track as any)) {
       result.set(Number(key), value as CompanyUID);
     }
     team.track = result;
     // team.track = recordToMap<number, CompanyUID>(team.track as any) ?? undefined;
  }
  return team ?? null;
}

export function useEventDB(uniqueNumber: number, name: string): EventStatus {
  const eventRef = db.ref(database, `/events/${name}/${uniqueNumber}`);
  const event = useObjectVal<EventStatus>(eventRef);
  return recordToMap(event) ?? new Map();
}
