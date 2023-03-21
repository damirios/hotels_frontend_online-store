export interface ProductState {
  products: any[];
  loading: boolean;
  error: null | string;
}

export enum ProductActionTypes {
  fetch_products = 'fetch_products',
  fetch_products_success = 'fetch_products_success',
  fetch_products_error = 'fetch_products_error'
}

interface FetchProductsAction {
  type: ProductActionTypes.fetch_products;
}
interface FetchProductsSuccessAction {
  type: ProductActionTypes.fetch_products_success;
  payload: any[];
}
interface FetchProductsErrorAction {
  type: ProductActionTypes.fetch_products_error;
  payload: string;
}

export type ProductAction = FetchProductsAction | FetchProductsSuccessAction | FetchProductsErrorAction;
