import { createSlice } from "@reduxjs/toolkit"
import { FilterState } from "../../types/filter"

const initialState: FilterState = {
    price_min: 0,
    price_max: null,
    manufacturersList: [],
    careTypes: []
}

const filterSlice = createSlice({
    name: 'filters',
    initialState: initialState as FilterState,
    reducers: {
        addCareType(state, action) {
            state.careTypes.push(action.payload);
        },
        removeCareType(state, action) {
            const index = state.careTypes.findIndex(el => el === action.payload);
            state.careTypes.splice(index, 1);
        }
    }
});

export const {
    addCareType,
    removeCareType
} = filterSlice.actions;

export default filterSlice.reducer;