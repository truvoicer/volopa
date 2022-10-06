// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {CURRENCY_LIST, CURRENCY_STATE} from "../constants/currency-constants";

const defaultState = {
    [CURRENCY_LIST]: [],
};
const defaultReducers = {
    setCurrencyList: (state, action) => {
        state[CURRENCY_LIST] = action.payload;
    },
};

export const currencySlice = createSlice({
    name: CURRENCY_STATE,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const currencyReducer = currencySlice.reducer;
export const {setCurrencyList} = currencySlice.actions;