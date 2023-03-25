import { ProductsState } from "../../types/product";
import { productsDB } from "../../data/productsDB";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { paginationInitialState } from "./paginationSlice";

const initialState: ProductsState = {
	list: [...productsDB],
	listToShow: productsDB.slice(0, paginationInitialState.visibleProductsNumber),
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
			state.listToShow.sort(function(a, b): number {
				if (sortParam === 'title' || sortParam === 'price') {
					if (a[sortParam] < b[sortParam]) {
						return -1 * coef;
					}
					return 1 * coef;
				}
				return 1;
			});
		},
		setShowProductsRange(state, action) {
			state.listToShow = state.list.slice(action.payload.from, action.payload.to);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.status = 'loading';
		}).addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
			state.status = 'loaded';
			state.list = action.payload;
			
		}).addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
			state.status = 'loaded';
			state.error = action.payload;
			
		})
	}
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const listPromise = new Promise(resolve => {
		setTimeout(() => resolve(productsDB), 500); 
	});

	return listPromise;
});

export const {
	sortProducts,
	setShowProductsRange
} = productsSlice.actions;

export default productsSlice.reducer;