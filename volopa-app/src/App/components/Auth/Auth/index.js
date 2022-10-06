import {
    SESSION_ACCESS_TOKEN,
    SESSION_AUTHENTICATED, SESSION_EXPIRES_AT,
    SESSION_IS_AUTHENTICATING,
    SESSION_STATE
} from "../../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {useEffect} from "react";
import Login from "../../../pages/Login";
import {
    getSessionLocalStorage,
    isLocalStorageTokenValid, setIsAuthenticatingAction,
    setSessionState
} from "../../../library/redux/actions/session-actions";
import {
    useNavigate,
    useNavigation
} from "react-router-dom";
import {tokenRefreshRequest} from "../../../library/api/middleware";
import {setAppHasLoadedAction} from "../../../library/redux/actions/app-actions";
import {APP_HAS_LOADED, APP_STATE} from "../../../library/redux/constants/app-constants";

/**
 * Auth component
 * Checks if session is authenticated and token is valid
 * Returns child components if session is authenticated
 *
 * @param children
 * @param session
 * @param app
 * @returns {JSX.Element}
 * @constructor
 */
function Auth({children, session, app}) {
    //Router navigate hook
    const navigate = useNavigate();

    async function authInit() {
        const tokenHandler = await tokenRefreshRequest();
        switch (tokenHandler?.action) {
            case 'success':
                navigate('/');
                break;
            case 'login':
            default:
                navigate('login');
                break;
        }
    }

    useEffect(() => {
        if (!app[APP_HAS_LOADED]) {
            return;
        }
        if (session[SESSION_AUTHENTICATED] && !session[SESSION_IS_AUTHENTICATING]) {
            return;
        }
        authInit();
    }, [session[SESSION_AUTHENTICATED], session[SESSION_IS_AUTHENTICATING], app[APP_HAS_LOADED]])

    useEffect(() => {
        setAppHasLoadedAction(true)
    }, [])

    return (
        <>
            {session[SESSION_AUTHENTICATED] && !session[SESSION_IS_AUTHENTICATING]
                ?
                    children
                :
                <Login/>
            }
        </>
    );
}

function mapStateToProps(state) {
    return {
      session: state[SESSION_STATE],
        app: state[APP_STATE]
    };
}

export default connect(
    mapStateToProps,
    null
)(Auth)