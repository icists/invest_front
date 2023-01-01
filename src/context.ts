import { createContext, useContext } from "react";

import { UserData } from "./schemes";

const UserContext = createContext<UserData>({
  name: "",
  teamUID: "",
  mail: null,
});

export const UserContextProvider = UserContext.Provider;

export function useUser() {
  return useContext(UserContext);
}
