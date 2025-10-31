import type { UserInterface } from "@/interface/user";
import { mockSeniorUser } from "@/utils/const";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: UserInterface;
  setUser: (user: UserInterface) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface>(mockSeniorUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
