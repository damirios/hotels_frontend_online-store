import { Middleware } from "@reduxjs/toolkit";
import { removeProduct } from "../store/slices/productSlice";
import { removeProductFromLocalStorage, setProductsToLocalStorage } from "../utilityFunctions/localStorageFunctions";


export const localStorageActions: Middleware = (store: any) => (next: any) => (action) => {
    // const products = getProductsFromLocalStorage();
    // if (products === null || products.length === 0) {
    //     setProductsToLocalStorage(productsDB);
    // }
    if (action.type === 'removeProductFromLocalStorage') {
        removeProductFromLocalStorage(action.payload);
        store.dispatch(removeProduct(action.payload));
    }
    
    return next(action);
}