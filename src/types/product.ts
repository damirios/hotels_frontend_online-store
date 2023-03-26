import { ProductType } from "./productDBType";

export interface ProductsState {
	list: ProductType[];
	pageList: ProductType[];
	loading: boolean;
	error: null | string;
	status: 'loading' | 'loaded' | 'failed' | 'idle';
}

export enum ProductsActionTypes {
	fetch_products = 'fetch_products',
	fetch_products_success = 'fetch_products_success',
	fetch_products_error = 'fetch_products_error'
}

interface FetchProductsAction {
	type: ProductsActionTypes.fetch_products;
}
interface FetchProductsSuccessAction {
	type: ProductsActionTypes.fetch_products_success;
	payload: any[];
}
interface FetchProductsErrorAction {
	type: ProductsActionTypes.fetch_products_error;
	payload: string;
}

export type ProductsAction = FetchProductsAction | FetchProductsSuccessAction | FetchProductsErrorAction;
