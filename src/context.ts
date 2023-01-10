import { createContext, useContext } from "react";

import {
  Company,
  CompanyUID,
  EventStatus,
  Status,
  Team,
  TeamUID,
  UserData,
} from "./schemes";

export const AuthContext = createContext<{ user: UserData; team: Team }>({
  user: {
    name: "",
    teamUID: "",
    mail: null,
    uniqueNumber: 0,
  },
  team: { members: new Map() },
});
export function useAuthData() {
  return useContext(AuthContext);
}

export const StatusContext = createContext<Status>({
  currentPitching: "",
  currentRound: 0,
  investable: false,
});
export function useStatus() {
  return useContext(StatusContext);
}

export const CompaniesContext = createContext<Map<CompanyUID, Company>>(
  {} as any
);
export function useCompanies() {
  return useContext(CompaniesContext);
}

export const AccountContext = createContext<{
  account: Map<TeamUID, number>;
  totalInvest: number;
}>({ account: new Map(), totalInvest: 0 });
export function useAccount() {
  return useContext(AccountContext);
}

export const InvestDataContext = createContext<
  {
    amount: Map<CompanyUID, number>;
    result: Map<CompanyUID, number>;
  }[]
>([]);
export function useInvestData() {
  return useContext(InvestDataContext);
}

export const EventContext = createContext<{
  bingo: EventStatus;
  completion: EventStatus;
}>({ bingo: new Map(), completion: new Map() });
export function useEvent() {
  return useContext(EventContext);
}
