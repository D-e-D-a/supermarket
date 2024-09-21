"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductsProps, UserInterface } from "../lib/interfaces";

interface UserContextProps {
  user: UserInterface | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null | undefined>>;
  cart:ProductsProps[];
  setCart:React.Dispatch<React.SetStateAction<ProductsProps[]>>
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<UserInterface | null>();
  const [cart, setCart] = useState<ProductsProps[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const value = {
    user,
    setUser,
    cart,
    setCart
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useAuth() {
  // Access the context
  const context = useContext(UserContext);

  // Check if the context exists
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }

  // Return the context
  return context;
}
