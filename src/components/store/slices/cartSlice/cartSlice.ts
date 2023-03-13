import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./../../store";
import { getCartLs } from "../../../../utils/getCartLS";
import { calcTotalPrice } from "../../../../utils/calcTotalPrice";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    types: string,
    sizes: number,
    count: number,
}

interface CartSliceState {
    totalPrice: number,
    pizzas: CartItem[]
}

const {pizzas, totalPrice} = getCartLs()

export const initialState: CartSliceState = {
    totalPrice,
    pizzas
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizzas(state, action: PayloadAction<CartItem>) {
            const findItem = state.pizzas.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.pizzas.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.pizzas)
        },
        minusPizzas(state, action: PayloadAction<string>) {
            const findItem = state.pizzas.find(obj => obj.id === action.payload)

            if (findItem) {
                findItem.count--
            }
        },
        removePizzas(state, action: PayloadAction<string>) {
            state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload)
        },
        clearPizzas(state) {
            state.pizzas = []
            state.totalPrice = 0
        },
    }
})

export const selectorCart = (state: RootState) => state.cart;
export const selectorCartId = (id: string) => (state: RootState) => state.cart.pizzas.find(obj => obj.id === id)

export const { addPizzas, removePizzas, clearPizzas, minusPizzas } = cartSlice.actions;

export default cartSlice.reducer;