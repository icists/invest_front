import { createContext, useContext } from "react";

import {
  Company,
  CompanyUID,
  EventStatus,
  Status,
  Team,
  UserData,
} from "./schemes";

export const AuthContext = createContext<{ user: UserData; team: Team }>({
  user: {
    name: "",
    teamUID: "",
    mail: null,
    uniqueNumber: 0,
  },
  team: { members: {} },
});
export function useAuthData() {
  return useContext(AuthContext);
}

export const StatusContext = createContext<Status>({
  currentRound: 0,
  investable: false,
});
export function useStatus() {
  return useContext(StatusContext);
}

export const CompaniesContext = createContext<Record<string, Company>>({});
export function useCompanies() {
  return useContext(CompaniesContext);
}

export const AccountContext = createContext<{
  account: number;
  totalInvest: number;
}>({ account: 0, totalInvest: 0 });
export function useAccount() {
  return useContext(AccountContext);
}

export const InvestDataContext = createContext<
  {
    amount: Record<CompanyUID, number>;
    result: Record<CompanyUID, number>;
  }[]
>([]);
export function useInvestData() {
  return useContext(InvestDataContext);
}

export const ValuationContext = createContext<{
  previous: Record<CompanyUID, number> | null;
  current: Record<CompanyUID, number> | null;
}>({ previous: null, current: null });
export function useValuation() {
  return useContext(ValuationContext);
}

export const EventContext = createContext<{
  bingo: EventStatus;
  completion: EventStatus;
}>({ bingo: {}, completion: {} });
export function useEvent() {
  return useContext(EventContext);
}
