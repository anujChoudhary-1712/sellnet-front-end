import { UserType, cartItems } from "./types";

export type context = {
  cartItems: cartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};
