import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "./../../store";

type SortId = {
    name: string;
    sortProperty: string;
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sortId: SortId;
    pageCount: number;
}

export const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    sortId: {
        name: "популярности", sortProperty: "rating"
    },
    pageCount: 1
}

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeCategories(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        changeSort(state, action: PayloadAction<SortId>) {
            state.sortId = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortId = action.payload.sortId;
            state.pageCount = action.payload.pageCount;
        },
        changePage(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
})

export const selectorAllFilters = (state: RootState) => state.filters
export const selectorCategories = (state: RootState) => state.filters.categoryId;
export const selectorSort = (state: RootState) => state.filters.sortId;

export const { changeCategories, changeSort, setFilters, changePage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;