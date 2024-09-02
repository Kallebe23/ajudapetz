"use client";
import { Session } from "next-auth";
import { createContext, ReactNode, useContext } from "react";

export const CustomSessionContext = createContext<{ session: Session | null }>({
  session: null,
});

interface Props {
  session: Session | null;
  children: ReactNode;
}

export function useSession() {
  const context = useContext(CustomSessionContext);

  return context.session;
}

export default function CustomSessionProvider({ session, children }: Props) {
  return (
    <CustomSessionContext.Provider value={{ session }}>
      {children}
    </CustomSessionContext.Provider>
  );
}
