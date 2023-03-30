import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    documentId
} from "firebase/firestore";
import {db} from "./FirebaseConfig";

export const create = createAsyncThunk(
    'firestore/create',
    async ({collection, data}, {rejectWithValue}) => {
        try {
            const res = await addDoc(firestoreCollection(db, collection), data);
            window.displayNotification({type: 'info', content: 'Product Created Successfully'})
            return res.id;
        } catch (err) {
            debugger
            window.displayNotification({type: 'error', content: `There was some error ${err.response.data}`})
            return rejectWithValue(err.response.data);
        }
    }
);

export const update = createAsyncThunk(
    'firestore/update',
    async ({id, collection, data}, {rejectWithValue}) => {
        // let {variation, images, ...rest} = data;
        // images = JSON.stringify(images);
        // variation = JSON.stringify(variation);
        // let tempData = {...rest, images, variation}
        debugger
        try {
            await setDoc(doc(firestoreCollection(db, collection), id), data, {merge: true})
                .then(res => {
                    debugger
                }).catch(err => {
                    console.log(err);
                })
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getById = createAsyncThunk(
    'firestore/getById',
    async ({id, collection}, {rejectWithValue}) => {
        try {
            const data = await getDoc(doc(db, collection, id));
            if (!data.data()) {
                debugger
            }//if the user doesn't exist
            return {...data.data(), uid: data.id};
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserTableData = createAsyncThunk(
    'firestore/getUserTableData',
    async ({uid}) => {
        let data = {};
        const tableDataRef = firestoreCollection(db, `users/${uid}/tableData`);
        const q = query(tableDataRef, where(documentId(), '==', '03-2023'));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map(doc => {
                data = {...doc.data(), id: doc.id}
            })
            return data
        } catch (error) {
            debugger
            return error.response.data
        }
    }
);

export const getUser = (uid) => {
    return new Promise(async (resolve, reject) => {
        try{
            const user = await getDoc(doc(db, 'users', uid))
            if(user.exists()) {
                resolve({...user.data(), uid: user.id})
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const updateTable = async (uid, data) => {

    const tableDataRef = firestoreCollection(db, `users/${uid}/tableData`);
    const docRef = doc(tableDataRef, '03-2023');
    try {
        await setDoc(docRef, {data: [...data]}, {merge: true})
    } catch (err) {
        debugger
        console.log(err);
    }
}



