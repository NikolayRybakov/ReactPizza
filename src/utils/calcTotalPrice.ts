import { CartItem } from "../components/store/slices/cartSlice/cartSlice";

export const calcTotalPrice = (pizzas: CartItem[]) => {
    return pizzas.reduce((sum, obj) => {
    return sum + obj.price * obj.count
}, 0)}