//Api config and endpoints
export default {
    baseUrl: process.env.REACT_APP_API_URL,
    endpoints: {
        login: '/login',
        tokenRefresh: '/token/refresh',
        currencies: '/currency/list',
        currencyConvert: '/currency/convert',
    }
}