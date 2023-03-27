import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/cart";

const initialState: CartState = {
    productsInCart: [] 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart(state, action) {
            const { barcode, quantity } = action.payload;
            const index = state.productsInCart.findIndex(el => el.barcode === barcode);
            if ( index !== -1 ) {
                state.productsInCart[index].quantity += +quantity; 
            } else {
                state.productsInCart.push({ barcode, quantity: +quantity });
            }
        },
        removeProductFromCart(state) {

        },
        removeAllProductsFromCart(state) {

        }
    }
});

export const {
    addProductToCart,
    removeProductFromCart,
    removeAllProductsFromCart
} = cartSlice.actions;

export default cartSlice.reducer;