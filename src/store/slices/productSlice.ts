import { ProductsState } from "../../types/product";
import { productsDB } from "../../data/productsDB";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductsState = {
  list: [...productsDB],
  loading: false,
  error: null,
  status: 'idle'
}

const productsSlice = createSlice({
	name: 'products',
	initialState: initialState as ProductsState,
	reducers: {
		getAllProducts(state, action) {
			console.log('payload: ', action);
			// state.list = products;
		},
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
		// .addCase(fetchProducts.fulfilled, (state: ProductsState, action: PayloadAction<[]>) => {
		// 	state.status = 'loaded';
		// 	state.products = action.payload;
		// })
		// .addCase(fetchProducts.rejected, (state: ProductsState, action: PayloadAction<string>) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// })
	}
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const listPromise = new Promise(resolve => {
		setTimeout(() => resolve(productsDB), 500); 
	});

	return listPromise;
});

export const {
	getAllProducts,
	sortProducts
} = productsSlice.actions;

export default productsSlice.reducer;

// export const productReducer = (state = initialState, action: ProductAction): ProductState => {
//   switch (action.type) {
//     case ProductActionTypes.fetch_products:
//       return {
//         loading: true,
//         error: null,
//         products: []
//       }
//     case ProductActionTypes.fetch_products_success:
//       return {
//         loading: false,
//         error: null,
//         products: action.payload
//       }
//     case ProductActionTypes.fetch_products_error:
//       return {
//         loading: false,
//         error: action.payload,
//         products: []
//       }
//     default:
//       return state;
//   }
// }