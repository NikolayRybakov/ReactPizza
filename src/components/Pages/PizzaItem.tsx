import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PizzaItem: React.FC = () => {

    const [pizza, setPizza] = useState<{
        title: string,
        imageUrl: string,
        price: number
    }>()

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function getPizza() {
            try {
                const { data } = await axios.get("https://63d51086c52305feff6d6421.mockapi.io/pizza/" + id)
                setPizza(data)
                console.log(data)
            }
            catch (error) {
                navigate("/")
            }
        }
        getPizza()
    }, [])

    if (!pizza) {
        return <h1>Загрузка...</h1>
    }

    return (
        <div className="pizza">
            <h1 className="pizza__title">{pizza.title}</h1>
            <img className="pizza__img" src={pizza.imageUrl} alt="" />
            <p className="pizza__price">{pizza.price} ₽</p>
        </div>

    )
}

export default PizzaItem;