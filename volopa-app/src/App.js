import './App.css';
import WalletDashboard from './App/pages/WalletDashboard';

import store from './App/library/redux/store';
import {Provider} from 'react-redux';
import Auth from "./App/components/Auth/Auth";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./App/pages/Login";
import {loadAxiosInterceptors, tokenRefreshRequest} from "./App/library/api/middleware";
import {useEffect} from "react";
import routeConfig from "./App/library/routes/route-config";

function App() {
    loadAxiosInterceptors();    //Load axios response interceptors
    //Router config
    const router = createBrowserRouter(routeConfig);
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default App;
