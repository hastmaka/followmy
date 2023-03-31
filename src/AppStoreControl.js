// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getById, getUserTableData} from "./helper/firebase/FirestoreApi";
import {getActualMonthAndYear} from "./helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function AppStoreControl(props) {
    const localStoreUser = JSON.parse(localStorage.getItem('user'));
    const {userStatus, tableDataStatus} = useSelector(slice => slice.admin);

    useEffect(_ => {
        if(userStatus.loaded) {
            window.dispatch(getById({id: localStoreUser.uid, collection: localStoreUser.selectedValue}))
            window.dispatch(getUserTableData({
                uid: localStoreUser.uid,
                collection: localStoreUser.selectedValue,
                monthAndYear: getActualMonthAndYear()
            }))
        }
    }, [userStatus.loaded])


    useEffect(_ => {
        //check if the user is already sign in on reload
        import('./helper/firebase/FirebaseAuthService').then(module => {
            module.subscribeToAuthChanges(localStoreUser.selectedValue)
        })
    }, [])


    return (
        <RootStyle>
            {userStatus.loaded && tableDataStatus.loaded && props.children}
        </RootStyle>
    );
}
