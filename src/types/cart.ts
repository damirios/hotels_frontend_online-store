import { ProductType } from "./productDBType";

export interface CartState {
    productsInCart: {product: ProductType, quantity: number}[];
}