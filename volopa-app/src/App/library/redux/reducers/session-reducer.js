// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {
    SESSION_AUTHENTICATED,
    SESSION_IS_AUTHENTICATING,
    SESSION_REDIRECT_URL,
    SESSION_STATE,
    SESSION_USER,
    SESSION_USER_TOKEN
} from "../constants/session-constants";

const defaultState = {
    [SESSION_USER]: {
        [SESSION_USER_TOKEN]: "",
    },
    [SESSION_AUTHENTICATED]: false,
    [SESSION_IS_AUTHENTICATING]: true,
    [SESSION_REDIRECT_URL]: null,
};

const defaultReducers = {
    setUserToken: (state, action) => {
        state[SESSION_USER][SESSION_USER_TOKEN] = action.payload;
    },
    setAuthenticated: (state, action) => {
        state[SESSION_AUTHENTICATED] = action.payload;
    },
    setIsAuthenticating: (state, action) => {
        state[SESSION_IS_AUTHENTICATING] = action.payload;
    },
    setRedirectUrl: (state, action) => {
        state[SESSION_REDIRECT_URL] = action.payload;
    },
};

export const sessionSlice = createSlice({
    name: SESSION_STATE,
    initialState: defaultState,
    reducers: defaultReducers,
});

export const sessionReducer = sessionSlice.reducer;
export const {setUserToken, setAuthenticated, setIsAuthenticating, setRedirectUrl} = sessionSlice.actions;