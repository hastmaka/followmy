import {lazy, Suspense, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Router from "./routes";
import {useConfirmDialog, useNotification} from "./helper/hooks/Hooks";
//async import
const EzModal = lazy(() => import('./components/EzModal/EzModal'))

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function App() {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const [children, setChildren] = useState(null);

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.setChildren = setChildren;
        window.displayNotification = displayNotification;
    }, [])
    return (
        <>
            <Router/>
            <Suspense fallback={<div>Loading Login...</div>}>
                <EzModal children={children}/>
            </Suspense>
        </>
    );
}