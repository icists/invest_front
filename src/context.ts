import { createContext, useContext } from "react";

import { UserData } from "./schemes";

const GlobalStateContext = createContext<{
  user: UserData | null;
  round: number | null;
}>({
  user: null,
  round: null,
});

export const GlobalStateContextProvider = GlobalStateContext.Provider;

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
