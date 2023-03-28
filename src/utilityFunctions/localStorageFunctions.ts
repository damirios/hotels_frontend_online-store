import { productsDB } from "../data/productsDB";
import { ProductType } from "../types/productDBType";


export function getProductsFromLocalStorage() {
    const stringifyProducts = localStorage.getItem('hotels_products');
    if (stringifyProducts !== null) {
        return JSON.parse(stringifyProducts);
    }
    return setProductsToLocalStorage(productsDB);
}

export function setProductsToLocalStorage(products: ProductType[]) {
    localStorage.setItem('hotels_products', JSON.stringify(products));
    return products;
}