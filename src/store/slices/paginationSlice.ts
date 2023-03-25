import { createSlice } from "@reduxjs/toolkit";

export const paginationInitialState = {
    visibleProductsNumber: 7
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: paginationInitialState,
    reducers: {
        setVisibleProductsNumber(state, action) {
            state.visibleProductsNumber = action.payload;
        }
    }
});

export const {
    setVisibleProductsNumber,
} = paginationSlice.actions;

export default paginationSlice.reducer;