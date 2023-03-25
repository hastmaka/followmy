import {auth,} from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {getById} from "./FirestoreApi";

export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return {
                        type: 'error',
                        content: 'Email already in use, please choose another one'
                    };
                default:
                    return {
                        type: 'error',
                        content: 'Internal Error'
                    }
            }
        })
};

export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/wrong-password':
                    return {type: 'error', content: 'Wrong Password, Double check Caps'}
                case 'auth/user-not-found':
                    return {type: 'error', content: 'User not Found', important: true}
                case 'auth/too-many-requests':
                    return {type: 'error', content: 'Too many request was made, try again later'}
                default:
                    return {type: 'error', content: 'Firebase Unknown Error'}
            }
        })
}

export const logoutUser = () => {
    return signOut(auth);
}

export const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
}

export const subscribeToAuthChanges = (user) => {
    onAuthStateChanged(auth, async _ => {
        try {
            window.dispatch(getById({id: user.uid, collection: 'users'}))
        } catch (err) {
            console.log(err);
        }
    })
}