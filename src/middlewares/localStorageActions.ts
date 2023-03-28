import { Middleware } from "@reduxjs/toolkit";
import { productsDB } from "../data/productsDB";
import { getProductsFromLocalStorage, setProductsToLocalStorage } from "../utilityFunctions/localStorageFunctions";


export const localStorageActions: Middleware = (store: any) => (next: any) => (action) => {
    // const products = getProductsFromLocalStorage();
    // if (products === null || products.length === 0) {
    //     setProductsToLocalStorage(productsDB);
    // }
    return next(action);
}