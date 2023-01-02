import { createContext, useContext } from "react";

import { Company, RoundData, Team, UserData } from "./schemes";

const AuthContext = createContext<{ user: UserData; team: Team }>({
  user: {
    name: "",
    teamUID: "",
    mail: null,
  },
  team: { account: 0, members: {} },
});

export const AuthContextProvider = AuthContext.Provider;

export function useAuthData() {
  return useContext(AuthContext);
}

const CompaniesContext = createContext<Record<string, Company> | null>(null);

export const CompaniesContextProvider = CompaniesContext.Provider;

export function useCompanies() {
  return useContext(CompaniesContext);
}

const RoundDataContext = createContext<{
  current: number | null;
  data: Record<number, RoundData> | null;
}>({ current: null, data: null });

export const RoundDataContextProvider = RoundDataContext.Provider;

export function useRoundData() {
  return useContext(RoundDataContext);
}
