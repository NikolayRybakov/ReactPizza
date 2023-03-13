import styles from "./search.module.scss";
import glass from "./../../img/search.svg";
import close from "./../../img/close.svg";
import { useRef, useCallback, useState } from "react";
import { debounce } from "lodash";
import { setSearchValue } from "./../store/slices/filterSlice/filterSlice";
import { useDispatch } from "react-redux";

const Search: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>("")
    const dispatch = useDispatch()

    const handleInput = (event: React.MouseEvent<HTMLImageElement>) => {
        dispatch(setSearchValue(""))
        setValue("")
        inputRef.current?.focus()
    }
    
    const handleDebounce = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300), [])

    const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        handleDebounce(e.target.value)
    } 

    return (
        <div className={styles.search}>
            <img className={styles.glass} src={glass} alt="glass" />
            <input
                ref={inputRef} 
                className={styles.root} 
                type="text" 
                placeholder="Поиск пиццы..." 
                value={value}
                onChange={handleInputSearch}
            />
            {value && <img onClick={handleInput} className={styles.close} src={close} alt="close" />}
        </div>
    )
}


export default Search;