import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

type PizzaItem = {
    id: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    imageUrl: string;
    rating: string;
    category: number;
}

interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

type FetchPizzaArgs = Record<string, string>

export const fetchPizza = createAsyncThunk<PizzaItem[], FetchPizzaArgs>('pizza/fetchPizza', async ({categoryBy, sortBy, order, search, pageCount}) => {
    const { data } = await axios.get<PizzaItem[]>(`https://63d51086c52305feff6d6421.mockapi.io/pizza?page=${pageCount}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${order}${search}`)
    return data;
    }
)

export const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchPizza.fulfilled, (state, action) => {
                    state.items = action.payload;
                    state.status = Status.SUCCESS;
                })
                .addCase(fetchPizza.pending, (state) => {
                    state.status = Status.LOADING
                    state.items = [];
                })
                .addCase(fetchPizza.rejected, (state) => {
                    state.status = Status.ERROR;
                    state.items = [];
                })
        },
    }
)

export const selectorPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;