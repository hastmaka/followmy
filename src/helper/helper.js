import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";
import {generalSliceActions} from "../store/adminSlice";

export const createAccountProcess = async (user) => {
    const tempUser = {
        email: user.email,
        provider: user.providerData[0].providerId,
        emailVerified: user.emailVerified,
        tableData: []
    }
    try{
        await setDoc(doc(db, 'users', user.uid), tempUser);
        return ('created')
    } catch (err) {
        return(err)
    }
}

export const loginProcess = ({firebaseUser, dbUser, navigate, from}) => {
    let tempAccessToken = from === 'google' ? firebaseUser.user.accessToken : firebaseUser.accessToken
    localStorage.setItem('uid', JSON.stringify(dbUser.uid))
    window.dispatch(generalSliceActions.setUser({...dbUser, token: tempAccessToken}))
    window.displayNotification({
        type: 'success',
        content: `Welcome ${dbUser.email}`
    })
    navigate('/')
}
