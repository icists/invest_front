import { createContext, useContext } from "react";

import { Company, CompanyUID, Team, UserData } from "./schemes";

export const AuthContext = createContext<{ user: UserData; team: Team }>({
  user: {
    name: "",
    teamUID: "",
    mail: null,
  },
  team: { account: 0, members: {} },
});
export function useAuthData() {
  return useContext(AuthContext);
}

export const CurrentRoundContext = createContext<number>(0);
export function useCurrentRound() {
  return useContext(CurrentRoundContext);
}

export const CompaniesContext = createContext<Record<string, Company>>({});
export function useCompanies() {
  return useContext(CompaniesContext);
}

export const InvestAmountContext = createContext<Record<CompanyUID, number>>(
  {}
);
export function useInvestAmount() {
  return useContext(InvestAmountContext);
}

export const ValuationContext = createContext<{
  previous: Record<CompanyUID, number> | null;
  current: Record<CompanyUID, number> | null;
}>({previous: null, current: null});
export function useValuation() {
  return useContext(ValuationContext);
}
