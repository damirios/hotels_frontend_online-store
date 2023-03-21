import { ProductState, ProductAction, ProductActionTypes } from "../../types/product"

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ProductActionTypes.fetch_products:
      return {
        loading: true,
        error: null,
        products: []
      }
    case ProductActionTypes.fetch_products_success:
      return {
        loading: false,
        error: null,
        products: action.payload
      }
    case ProductActionTypes.fetch_products_error:
      return {
        loading: false,
        error: action.payload,
        products: []
      }
    default:
      return state;
  }
}