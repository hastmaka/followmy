// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {generalSliceActions} from "./store/adminSlice";
import {getById, getUserTableData} from "./helper/firebase/FirestoreApi";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function AppStoreControl(props) {
    const uid = JSON.parse(localStorage.getItem('uid'));
    const {userStatus, tableDataStatus} = useSelector(slice => slice.admin);

    useEffect(_ => {
        if(!userStatus.loaded)
        window.dispatch(getById({id: uid, collection: 'users'}))
        window.dispatch(getUserTableData({uid}))
    }, [userStatus.loaded])


    return (
        <RootStyle>
            {userStatus.loaded && tableDataStatus.loaded && props.children}
        </RootStyle>
    );
}
