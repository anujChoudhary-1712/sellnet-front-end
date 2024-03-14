"use client";
import { getRequest } from "@/actions/APICalls";
import { context } from "@/types/contextapi";
import { cartItems, UserType,Token } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext<context>({
  cartItems: [],
  setCartItems: (): cartItems[] => [],
  total: 0,
  setTotal: (): number => 0,
  isAuthenticated: false,
  setAuthenticated: (): boolean => false,
  user: {
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  },
  setUser: (): UserType => ({
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  }),
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItems[]>([]);
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user,setUser] = useState<UserType>({
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  })

  useEffect(()=>{
    const fetchUser = async() =>{
      const token = localStorage.getItem('token')
      if(token){
        const decodedToken:Token = jwtDecode(JSON.parse(token))
        const userId = decodedToken.id
  
        const data = await getRequest(`users/user/${userId}`)
        
        if(data?.error){
          console.log(data.message)
          return
        }

        setUser(data.user)
        setAuthenticated(true)
      }
    }
    fetchUser()
  },[])

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        setTotal,
        isAuthenticated,
        setAuthenticated,
        user,setUser
      }}
    >
      {children}
    </Context.Provider>
  );
};
