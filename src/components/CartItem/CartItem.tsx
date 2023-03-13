import plus from "./../../img/plus.svg";
import close from "./../../img/close.svg"
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { addPizzas, minusPizzas, removePizzas } from "../store/slices/cartSlice/cartSlice";

type CartItemProps = {
    id: string,
    title: string,
    price: number,
    count: number,
    imageUrl: string,
    types: string,
    sizes: number
}

const CartItem: React.FC<CartItemProps> = ({id, title, price, count, imageUrl, types, sizes}) => {

    const dispatch = useDispatch()

    const handleMinusPizza = () => {
        dispatch(minusPizzas(id))
    }

    const handlePlusPizza = () => {
        dispatch(addPizzas({id} as CartItemProps))
    }

    const handleRemovePizza = () => {
        dispatch(removePizzas(id))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>{types}, {sizes} см.</p>
            </div>
            <div className="cart__item-count">
                <button disabled={count === 1} onClick={handleMinusPizza} className={clsx("button button--outline button--circle cart__item-count-minus", {"button__count_disabled": count === 1})}>
                    <img src={plus} alt="plus"/>
                </button>
                <b>{count}</b>
                <button onClick={handlePlusPizza} className="button button--outline button--circle cart__item-count-plus">
                    <img src={plus} alt="plus"/>
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count}</b>
            </div>
            <div onClick={handleRemovePizza} className="cart__item-remove">
                <div className="button button--outline button--circle">
                    <img src={close} alt="close"/>
                </div>
            </div>
        </div>
    )
}

export default CartItem;