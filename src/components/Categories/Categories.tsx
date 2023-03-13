import { useSelector, useDispatch } from "react-redux";
import { changeCategories, selectorCategories } from "../store/slices/filterSlice/filterSlice";
import { useCallback } from "react";

const categories: string[] = [
    "Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"
]

const Categories: React.FC = () => {

    const categoryId = useSelector(selectorCategories)
    const dispatch = useDispatch()

    const onChangeCategories = useCallback((index: number) => {
        dispatch(changeCategories(index)) 
    }, [])

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={category}
                        className={index === categoryId ? "active" : ""}
                        onClick={() => onChangeCategories(index)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;