import ReactPaginate from 'react-paginate';
import styles from "./pagination.module.scss";
import { changePage } from '../store/slices/filterSlice/filterSlice';
import { useDispatch } from 'react-redux';

const Pagination: React.FC = () => {

    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => dispatch(changePage(e.selected + 1))}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;