import {doc, setDoc, collection} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";
import {generalSliceActions} from "../store/adminSlice";

export const createAccountProcess = async ({user, selectedValue}) => {
    const date = new Date();
    const customID = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
    const tempUser = {
        email: user.email,
        provider: user.providerData[0].providerId,
        emailVerified: user.emailVerified
    }
    try{
        //create user in db
        await setDoc(doc(db, selectedValue, user.uid), tempUser)
        // Add subCollection to user document
        const subCollectionRef = collection(db, selectedValue, user.uid, 'tableData');
        await setDoc(doc(subCollectionRef, customID), {data: []});

        return ('created')
    } catch (err) {
        return(err)
    }
}

export const loginProcess = ({firebaseUser, dbUser, navigate, from, selectedValue}) => {
    let tempAccessToken = from === 'google' ? firebaseUser.user.accessToken : firebaseUser.accessToken
    localStorage.setItem('user', JSON.stringify({uid: dbUser.uid, selectedValue}))
    window.dispatch(generalSliceActions.setUser({...dbUser, token: tempAccessToken, selectedValue}))
    window.displayNotification({
        type: 'success',
        content: `Welcome ${dbUser.email}`
    })
    navigate('/')
}


