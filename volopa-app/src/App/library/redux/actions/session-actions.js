import store from "../store"
import React from "react";
import {
    setAuthenticated,
    setIsAuthenticating,
    setUserToken
} from "../reducers/session-reducer";
import {
    SESSION_ACCESS_TOKEN, SESSION_EXPIRES_AT,
    SESSION_STATE,
    SESSION_USER_EMAIL,
    SESSION_USER_ID,
    SESSION_USER_TOKEN
} from "../constants/session-constants";

/**
 * Sets userToken session redux state
 * @param token
 */
export function setSessionUserTokenAction(token) {
    store.dispatch(setUserToken(token));
}

/**
 * Sets authenticated session redux state
 * @param authenticated
 */
export function setSessionAuthenticatedAction(authenticated) {
    store.dispatch(setAuthenticated(authenticated));
}

/**
 * Sets isAuthenticating session redux state
 * @param isAuthenticating
 */
export function setIsAuthenticatingAction(isAuthenticating) {
    store.dispatch(setIsAuthenticating(isAuthenticating));
}

/**
 * Sets session redux state on successful authentication
 * @param token
 */
export function setSessionState({token}) {
    setSessionAuthenticatedAction(true);
    setIsAuthenticatingAction(false);
    setSessionUserTokenAction(token);
}

/**
 * Sets local storage items on successful login or token request
 * @param token
 * @param expires_at
 */
export function setSessionLocalStorage({token, expires_at}) {
    let expiresAt = JSON.stringify(((expires_at - 3600) * 1000) + new Date().getTime());
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
}

/**
 * Resets local session storage
 */
export function removeLocalSession() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
}

/**
 * CHecks if token is past expiry date
 * @returns {boolean}
 */
export function isLocalStorageTokenValid() {
    const getLocalStorage = getSessionLocalStorage();
    if (typeof getLocalStorage[SESSION_ACCESS_TOKEN] === 'undefined' || typeof getLocalStorage[SESSION_EXPIRES_AT] === 'undefined') {
        return false;
    }
    return Date.now() < getLocalStorage[SESSION_EXPIRES_AT];
}

/**
 * Returns local session storage object
 * @returns {{access_token: string, expires_at: any}}
 */
export function getSessionLocalStorage() {
    return {
        access_token: localStorage.getItem('access_token'),
        expires_at: JSON.parse(localStorage.getItem('expires_at'))
    }
}
