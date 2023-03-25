import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig";

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

export const loginProcess = () => {
    debugger
    return true
}