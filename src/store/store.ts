import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import filtersReducer from "./slices/filtersSlice";
import paginationReducer from "./slices/paginationSlice";
import sortReducer from "./slices/sortSlice";
import dropDownReducer from "./slices/dropDownSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer,
        pagination: paginationReducer,
        sort: sortReducer,
        dropDown: dropDownReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;