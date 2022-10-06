import store from "../store"
import React from "react";
import {
    setAppHasLoaded
} from "../reducers/app-reducer";

/**
 * Sets appHasLoaded state
 * @param appHasLoaded
 */
export function setAppHasLoadedAction(appHasLoaded) {
    store.dispatch(setAppHasLoaded(appHasLoaded));
}
