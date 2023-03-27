import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import filtersReducer from "./slices/filtersSlice";
import paginationReducer from "./slices/paginationSlice";
import sortReducer from "./slices/sortSlice";
import dropDownReducer from "./slices/dropDownSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer,
        pagination: paginationReducer,
        sort: sortReducer,
        dropDown: dropDownReducer,
        cart: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;