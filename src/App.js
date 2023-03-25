import {lazy, Suspense, useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
//
import ThemeProvider from "./theme";
import EzNotification from "./components/EzNotification/EzNotification";
import EzConfirmDialog from "./components/EzConfirmDialog/EzConfirmDialog";
import Login from "./section/login/Login";
import Router from "./routes";
import AppStoreControl from "./AppStoreControl";
import {addNeededSlices, verifySession} from "./AppController";
//dynamic import
const CreateAccount = lazy(() => import('./section/login/CreateAccount'))
const ForgotPassword = lazy(() => import('./section/login/ForgotPassword'))

//----------------------------------------------------------------

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [runApp, setRunApp] = useState(false);

    useEffect(_ => {
        if (!verifySession() && !['/login', '/create-account', '/forgot-password'].includes(location.pathname)) {
            navigate('/login')
        }
    }, [location])

    return (
        <ThemeProvider>
            {!runApp && !verifySession() ?
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/create-account' element={<Suspense fallback={<p>Loading...</p>}>{<CreateAccount/>}</Suspense>}/>
                    <Route path='/forgot-password' element={<Suspense fallback={<p>Loading...</p>}>{<ForgotPassword/>}</Suspense>}/>
                    <Route path='*' to='/login' element={<Login/>}/>
                </Routes> :
                runApp ?
                    <Provider store={store}>
                        <AppStoreControl>
                            <Router/>
                            <EzNotification/>
                            <EzConfirmDialog/>
                        </AppStoreControl>
                    </Provider> :
                    addNeededSlices(setRunApp)}
        </ThemeProvider>
    )
};
