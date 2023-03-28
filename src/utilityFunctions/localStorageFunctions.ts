import { productsDB } from "../data/productsDB";
import { ProductType } from "../types/productDBType";


export function getProductsFromLocalStorage() {
    const stringifyProducts = localStorage.getItem('hotels_products');
    
    if (stringifyProducts !== null && JSON.parse(stringifyProducts).length !== 0) {
        return JSON.parse(stringifyProducts);
    }
    
    return setProductsToLocalStorage(productsDB);
}

export function setProductsToLocalStorage(products: ProductType[]) {
    localStorage.setItem('hotels_products', JSON.stringify(products));
    return products;
}

export function removeProductFromLocalStorage(barcode: string) {
    const stringifyProducts = localStorage.getItem('hotels_products');
    if (stringifyProducts !== null) {
        const productInLocalStorage: ProductType[] = JSON.parse(stringifyProducts);
        const index = productInLocalStorage.findIndex(el => el.barcode === barcode);
        productInLocalStorage.splice(index, 1);
        localStorage.setItem('hotels_products', JSON.stringify(productInLocalStorage));
    }
}