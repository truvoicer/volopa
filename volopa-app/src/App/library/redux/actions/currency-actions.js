import store from "../store"
import React from "react";
import {
    setCurrencyList
} from "../reducers/currency-reducer";

/**
 * Sets currency list state
 * @param currencyList
 */
export function setCurrencyListAction(currencyList) {
    store.dispatch(setCurrencyList(currencyList));
}
