import { createContext, useContext } from "react";

import { UserData } from "./schemes";

const GlobalStateContext = createContext<{
  user: UserData | null;
}>({
  user: null,
});

export const GlobalStateContextProvider = GlobalStateContext.Provider;

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
