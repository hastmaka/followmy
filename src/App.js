import {lazy, Suspense, useEffect, useMemo, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
//
import Login from "./section/login/Login";
import Router from "./routes";
import AppStoreControl from "./AppStoreControl";
import {addNeededSlices, verifySession} from "./AppController";
import {useConfirmDialog, useNotification} from "./helper/hooks/Hooks";
import EzModal from "./components/EzModal/EzModal";
//dynamic import
const CreateAccount = lazy(() => import('./section/login/CreateAccount'))
const ForgotPassword = lazy(() => import('./section/login/ForgotPassword'))

//----------------------------------------------------------------

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const [children, setChildren] = useState(null);
    const [runApp, setRunApp] = useState(false);
    // debugger
    useEffect(_ => {
        if (!verifySession() && !['/login', '/create-account', '/forgot-password'].includes(location.pathname)) {
            navigate('/login')
        }
    }, [location]);

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.setChildren = setChildren;
        window.displayNotification = displayNotification;
    }, [])


    return (
        <>
            <Suspense fallback={<div>Loading Login...</div>}>
                <EzModal children={children}/>
            </Suspense>
            {!runApp && !verifySession() ?
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/create-account' element={<Suspense fallback={<p>Loading...</p>}>{<CreateAccount/>}</Suspense>}/>
                    <Route path='/forgot-password' element={<Suspense fallback={<p>Loading...</p>}>{<ForgotPassword/>}</Suspense>}/>
                    <Route path='*' to='/login' element={<Login/>}/>
                </Routes> :
                runApp ?
                    <AppStoreControl>
                        <Router/>
                    </AppStoreControl> :
                addNeededSlices(
                    setRunApp,
                    dispatch,
                    confirm,
                    setChildren,
                    displayNotification
                )
            }
        </>
    )
};
