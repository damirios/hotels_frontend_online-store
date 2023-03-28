import { ProductsState } from "../../types/product";
import { productsDB } from "../../data/productsDB";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isSubarray } from '../../utilityFunctions/isSubarray';
import { paginationInitialState } from "./paginationSlice";
import { getProductsFromLocalStorage } from "../../utilityFunctions/localStorageFunctions";

const initialState: ProductsState = {
	list: getProductsFromLocalStorage(),
	pageList: [...productsDB].slice(0, paginationInitialState.visibleProductsNumber),
	loading: false,
	error: null,
	status: 'idle'
}

const productsSlice = createSlice({
	name: 'products',
	initialState: initialState as ProductsState,
	reducers: {
		sortProducts(state, action: PayloadAction<{sortParam: string, sortOrder: string}>) {
			const {sortParam, sortOrder} = action.payload;
			const coef = sortOrder === 'asc' ? 1 : -1;
			state.list.sort(function(a, b): number {
				if (sortParam === 'title' || sortParam === 'price') {
					if (a[sortParam] < b[sortParam]) {
						return -1 * coef;
					}
					return 1 * coef;
				}
				return 1;
			});
			state.pageList = state.list.slice(0, paginationInitialState.visibleProductsNumber);
		},
		fetchPageProducts(state, action) {
			const {page, productsNumber} = action.payload;
			const firstProductIndex = (page - 1) * productsNumber;
			const lastProductIndex = productsNumber * page > state.list.length ? state.list.length : productsNumber * page;
			state.pageList = state.list.slice(firstProductIndex, lastProductIndex);
		},
		removeProduct(state, action) {
			const index = state.list.findIndex(el => el.barcode === action.payload);
			state.list.splice(index, 1);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.status = 'loading';
		}).addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
			state.status = 'loaded';
			state.list = action.payload.list;
			state.pageList = action.payload.pageList;
			
		}).addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
			state.status = 'loaded';
			state.error = action.payload;
			
		})
	}
});

type FetchProductsParamsType = {
	maxPrice: string;
	minPrice: string;
	selectedManufacturers: string[];
	careTypes: string[];
	shownProductsNumber: number;
	page: number;
	sortParams?: {
		order: string,
		param: string
	}
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params: FetchProductsParamsType) => {
	const {page, maxPrice, minPrice, selectedManufacturers, shownProductsNumber, careTypes, sortParams} = params;
	let allProducts = [...productsDB];
	if (sortParams) {
		allProducts.sort((a, b) => {
			const coef = sortParams.order === 'asc' ? 1 : -1;
			if (sortParams.param === 'title') {
				if (a.title < b.title) {
					return -1 * coef;
				} else {
					return 1 * coef;
				}
			} else if (sortParams.param === 'price') {
				if (a.price < b.price) {
					return -1 * coef;
				} else {
					return 1 * coef;
				}
			}
			return 1;
		});
	}
	
	// по макс. цене
	if (params.maxPrice !== '') {
		allProducts = allProducts.filter(product => product.price <= +maxPrice);
	}
	// по мин. цене
	if (params.minPrice !== '') {
		allProducts = allProducts.filter(product => product.price >= +minPrice);
	}
	// по производителям
	if (params.selectedManufacturers.length !== 0) {
		allProducts = allProducts.filter(product => selectedManufacturers.includes(product.manufacturer));
	}
	// по типам ухода
	if (params.careTypes.length !== 0) {
		allProducts = allProducts.filter(product => isSubarray(product.careTypes, careTypes));
	}

	const firstProductIndex = (page - 1) * shownProductsNumber;
	const lastProductIndex = shownProductsNumber * page > allProducts.length ? allProducts.length : shownProductsNumber * page;
	// по страницам
	const productsToShow = allProducts.slice(firstProductIndex, lastProductIndex);


	const listPromise = new Promise(resolve => {
		setTimeout(() => resolve({
			list: allProducts,
			pageList: productsToShow
		}), 700); 
	});

	return listPromise;
});

export const {
	sortProducts,
	fetchPageProducts,
	removeProduct
} = productsSlice.actions;

export default productsSlice.reducer;