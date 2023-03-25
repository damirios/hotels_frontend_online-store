import { createSlice } from "@reduxjs/toolkit"
import { FilterState } from "../../types/filter"

const initialState: FilterState = {
    price_min: 0,
    price_max: 10000,
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
        },
        setFilters(state, action) {
            state.manufacturersList = action.payload.list;
            state.price_min = action.payload.price_min;
            state.price_max = action.payload.price_max;
        }
    }
});

export const {
    addCareType,
    removeCareType,
    setFilters
} = filterSlice.actions;

export default filterSlice.reducer;