import Categories from "../Categories/Categories";
import { useEffect } from "react";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Sort from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { selectorPizza, fetchPizza } from "../store/slices/pizzaSlice/pizzaSlice";
import { useAppDispatch } from "../store/store";
import { selectorAllFilters } from "./../store/slices/filterSlice/filterSlice";

const Main: React.FC = () => {

    const dispatch = useAppDispatch()

    const {categoryId, sortId, pageCount, searchValue} = useSelector(selectorAllFilters)
    const {items, status} = useSelector(selectorPizza)

    const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortId.sortProperty.replace("-", "");
    const order = sortId.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    const getPizza = () => {
        dispatch(fetchPizza({categoryBy, sortBy, order, search, pageCount: String(pageCount)}))
    }

    useEffect(() => {
        getPizza()
    }, [categoryId, sortId, pageCount, search])


    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort sortId={sortId}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === "error" ? <div className="content__error-info">
                       <h1>Ошибка, попробуйте перезагрузить страницу!</h1> 
                    </div> :
                    status === "loading" ? [...new Array(10)].map((_, index) => <Skeleton key={index} />) : items.map(pizza => (
                        <PizzaBlock key={pizza.id} {...pizza} />
                    ))
                }
            </div>
            <Pagination />
        </>
    )
}

export default Main;