"use client";
import { getRequest } from "@/actions/APICalls";
import { context } from "@/types/contextapi";
import { cartItems, UserType, Token } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Context = createContext<any>({
  cartItems: [],
  setCartItems: (): cartItems[] => [],
  total: 0,
  setTotal: (): number => 0,
  windowWidth: 300,
  setWindowWidth: (): number => 300,
  isAuthenticated: false,
  setAuthenticated: (): boolean => false,
  user: {
    _id:"",
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  },
  setUser: (): UserType => ({
    _id:"",
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  }),
  products:[],setProducts:() => []
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItems[]>([]);
  const [total, setTotal] = useState(0);
  const [windowWidth, setWindowWidth] = useState(300);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [products,setProducts] = useState<any[]>([])
  const [user, setUser] = useState<UserType>({
    _id:"",
    fullname: "",
    accountType: "",
    email: "",
    emailToken: null,
    emailVerified: false,
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken: Token = jwtDecode(token);
        const userId = decodedToken.id;

        const data = await getRequest(`users/user/${userId}`);

        if (data?.error) {
          console.log(data.message);
          return;
        }

        setUser(data.user);
        setAuthenticated(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        setTotal,
        windowWidth,
        setWindowWidth,
        isAuthenticated,
        setAuthenticated,
        user,
        setUser,
        products,setProducts
      }}
    >
      {children}
    </Context.Provider>
  );
};
