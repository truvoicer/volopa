import apiConfig from "../api/config";
import {isNotEmpty} from "../helpers/utils-helper";
import {
    getSessionLocalStorage, isLocalStorageTokenValid,
    removeLocalSession,
    setSessionLocalStorage,
    setSessionState
} from "../redux/actions/session-actions";
import {SESSION_ACCESS_TOKEN} from "../redux/constants/session-constants";

const axios = require("axios");

/**
 * Initialise axios apiRequest with initial config
 * @type {AxiosInstance}
 */
const apiRequest = axios.create({
    baseURL: apiConfig.baseUrl,
});

/**
 * Loads axios response interceptors
 * Redirects to login when response status is unauthorized
 */
export function loadAxiosInterceptors() {
    apiRequest.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        switch (error?.response?.status) {
            case 401:
                handleUnauthorized()
                break;
        }
        return Promise.reject(error);
    });
}

/**
 * Build authorization header with bearer token from local storage
 * @returns {{Authorization: string}|boolean}
 */
const getAuthHeader = () => {
    const sessionStorage = getSessionLocalStorage();
    //Return false if local session token is invalid
    if (typeof sessionStorage[SESSION_ACCESS_TOKEN] === 'undefined' || !isNotEmpty(sessionStorage[SESSION_ACCESS_TOKEN])) {
        return false;
    }
    return {
        'Authorization': `Bearer ${sessionStorage[SESSION_ACCESS_TOKEN]}`
    };
}

/**
 * Makes api login request
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function authLoginRequest({payload}) {
    const request = {
        method: "post",
        url: apiConfig.endpoints.login,
        data: payload,
    }
    return apiRequest.request(request);
}

/**
 * Makes api fetch request
 * Returns false if headers are invalid
 *
 * @param endpoint
 * @param params
 * @returns {boolean|Promise<AxiosResponse<any>>}
 */
export function fetchRequest({endpoint, params={}}) {
    const headers = getAuthHeader();
    if (!headers) {
        console.error('Header token incorrectly set');
        return false;
    }
    const request = {
        method: "get",
        url: endpoint,
        params,
        headers
    }
    return apiRequest.request(request);
}

/**
 * Makes token refresh api request
 * Returns false if headers are invalid
 *
 * @returns {boolean|Promise<AxiosResponse<any>>}
 */
export async function tokenRefreshRequest() {
    const headers = getAuthHeader();
    if (!headers) {
        console.error('Header token incorrectly set');
        // handleUnauthorized();
        return {action: 'login'};
    }
    const isTokenValid = isLocalStorageTokenValid();    //Checks token is valid and not expired
    if (!isTokenValid) {
        console.error('Token expired');
        // handleUnauthorized();
        return {action: 'login'};
    }
    const request = {
        method: "get",
        url: apiConfig.endpoints.tokenRefresh,
        headers
    }
    const getRequest = await apiRequest.request(request);
    if(handleTokenResponse(getRequest)) {
        return {action: 'success'};
    }
    return {action: 'login'};
}

export function handleTokenResponse(result) {
    const token = result?.data?.data?.token;
    const expiresAt = result?.data?.data?.expires_at;
    if (token) {
        //Set authenticated redux session state
        setSessionState({token, expires_at: expiresAt})
        //Set authenticated local storage data
        setSessionLocalStorage({token, expires_at: expiresAt})
        return true;
    }
    return false;
}

export function handleUnauthorized() {
    removeLocalSession();
    window.location = '/login';
}