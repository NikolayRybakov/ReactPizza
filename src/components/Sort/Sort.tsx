import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSort } from "../store/slices/filterSlice/filterSlice";

type SortItem = {
    name: string;
    sortProperty: string;
}

type PopupEvent = MouseEvent & {
    path: Node[]; 
 }

export const sortList: SortItem[] = [
    { name: "популярности (по убыванию)", sortProperty: "rating" },
    { name: "популярности (по возрастанию)", sortProperty: "-rating" },
    { name: "цене (по убыванию)", sortProperty: "price" },
    { name: "цене (по возрастанию)", sortProperty: "-price" },
    { name: "алфавиту (по убыванию)", sortProperty: "title" },
    { name: "алфавиту (по возрастанию)", sortProperty: "-title" }
]

type SortIdProps = {
    sortId: SortItem
}



const Sort: React.FC<SortIdProps> = memo(({sortId}) => {

    const dispatch = useDispatch()
    const inputRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState<boolean>(false)

    const handleSortActive = (obj: SortItem) => {
        dispatch(changeSort(obj))
        setOpen(false)
    }

    useEffect(() => {
        const handleClickOutSide = (event: PopupEvent) => {
            if (!event.composedPath().includes(inputRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener("click", handleClickOutSide)

        return () => {
            document.body.removeEventListener("click", handleClickOutSide)
        }
    }, [])

    return (
        <div ref={inputRef} className="sort">
            <div className="sort__label" onClick={() => setOpen(!open)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span>{sortId.name}</span>
            </div>
            {open && <div className="sort__popup">
                <ul>
                    {sortList.map((obj, index) => (
                        <li
                            key={index}
                            className={sortId.sortProperty === obj.sortProperty ? "active" : ""}
                            onClick={() => handleSortActive(obj)}
                        >{obj.name}
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    )
})

export default Sort;