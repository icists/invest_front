import { createContext, useContext } from "react";

import { Company, RoundData, UserData } from "./schemes";

const UserContext = createContext<UserData>({
  name: "",
  teamUID: "",
  mail: null,
});

export const UserContextProvider = UserContext.Provider;

export function useUser() {
  return useContext(UserContext);
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
