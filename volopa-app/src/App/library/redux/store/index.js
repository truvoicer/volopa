import {
    configureStore,
} from "@reduxjs/toolkit";

import {sessionReducer} from "../reducers/session-reducer";
import {CURRENCY_STATE} from "../constants/currency-constants";
import {SESSION_STATE} from "../constants/session-constants";
import {currencyReducer} from "../reducers/currency-reducer";
import {appReducer} from "../reducers/app-reducer";
import {APP_STATE} from "../constants/app-constants";

const store = configureStore({
    reducer: {
        [SESSION_STATE]: sessionReducer,
        [CURRENCY_STATE]: currencyReducer,
        [APP_STATE]: appReducer,
    },
});

export default store;