import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice/filterSlice";
import cartReducer from "./slices/cartSlice/cartSlice";
import pizzaReducer from "./slices/pizzaSlice/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()