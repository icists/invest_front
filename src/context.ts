import { createContext, useContext } from "react";

import { UserData } from "./schemes";

const GlobalStateContext = createContext<{
  user: UserData | null;
  currentRound: number | null;
}>({
  user: null,
  currentRound: null,
});

export const GlobalStateContextProvider = GlobalStateContext.Provider;

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
