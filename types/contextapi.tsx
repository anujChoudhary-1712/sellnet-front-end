import { cartItems } from "./types"

export type context = {
    cartItems:cartItems[],
    setCartItems:React.Dispatch<React.SetStateAction<cartItems[]>>,
    total:number,
    setTotal:React.Dispatch<React.SetStateAction<number>>
}