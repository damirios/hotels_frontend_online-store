import { Middleware } from "@reduxjs/toolkit";
import { removeProduct, updateProducts } from "../store/slices/productSlice";
import { changeProductInLocalStorage, createProductInLocalStorage, removeProductFromLocalStorage } from "../utilityFunctions/localStorageFunctions";


export const localStorageActions: Middleware = (store: any) => (next: any) => (action) => {
    
    if (action.type === 'changeProductInLocalStorage') {
        changeProductInLocalStorage(action.payload.barcode, action.payload.data);
        store.dispatch(updateProducts());
    }

    if (action.type === 'createProductInLocalStorage') {
        createProductInLocalStorage(action.payload.barcode, action.payload.data);
        store.dispatch(updateProducts());
    }

    if (action.type === 'removeProductFromLocalStorage') {
        removeProductFromLocalStorage(action.payload);
        store.dispatch(removeProduct(action.payload));
    }
    
    return next(action);
}