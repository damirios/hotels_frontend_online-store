import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import filtersReducer from "./slices/filtersSlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer,
        pagination: paginationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;