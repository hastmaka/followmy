// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {useConfirmDialog, useNotification} from "./helper/hooks/Hooks";
import {Suspense, useEffect, useState} from "react";
import EzModal from "./components/EzModal/EzModal";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function AppStoreControl(props) {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    const {displayNotification} = useNotification();
    const [children, setChildren] = useState(null);
    const [allLoaded, setAllLoaded] = useState(false)

    useEffect(_ => {
        window.dispatch = dispatch;
        window.confirm = confirm;
        window.setChildren = setChildren;
        window.displayNotification = displayNotification;
        setAllLoaded(true)
    }, [])

    return (
        <RootStyle>
            {allLoaded && props.children}
            <Suspense fallback={<div>Loading Login...</div>}>
                <EzModal children={children}/>
            </Suspense>
        </RootStyle>
    );
}
