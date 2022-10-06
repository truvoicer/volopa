import Auth from "../../components/Auth/Auth";
import WalletDashboard from "../../pages/WalletDashboard";
import Login from "../../pages/Login";

export default [
    {
        path: "/",
        element: (
            <Auth>
                <WalletDashboard/>
            </Auth>
        ),
    },
    {
        path: "/login",
        element: <Login/>,
    },
];