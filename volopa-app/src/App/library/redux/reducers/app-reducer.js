// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {APP_HAS_LOADED, APP_STATE} from "../constants/app-constants";

const defaultState = {
    [APP_HAS_LOADED]: false,
};
const defaultReducers = {
    setAppHasLoaded: (state, action) => {
        state[APP_HAS_LOADED] = action.payload;
    },
};

export const appSlice = createSlice({
    name: APP_STATE,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const appReducer = appSlice.reducer;
export const {setAppHasLoaded} = appSlice.actions;