import {doc, setDoc, collection} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";
import {generalSliceActions} from "../store/adminSlice";

export const createAccountProcess = async (user) => {
    const date = new Date();
    const customID = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
    const tempUser = {
        email: user.email,
        provider: user.providerData[0].providerId,
        emailVerified: user.emailVerified
    }
    try{
        //create user in db
        await setDoc(doc(db, 'users', user.uid), tempUser)
        // Add subCollection to user document
        const subCollectionRef = collection(db, 'users', user.uid, 'tableData');
        await setDoc(doc(subCollectionRef, customID), {data: []});

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
