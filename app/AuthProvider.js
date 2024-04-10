"use client";
import { AuthContextProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
};
