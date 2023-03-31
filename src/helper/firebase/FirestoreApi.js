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
            return {...data.data(), uid: data.id, select: collection};
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserTableData = createAsyncThunk(
    'firestore/getUserTableData',
    async ({uid, collection, monthAndYear}) => {
        let data = {},
            documentIds = [];
        //data table reference
        const tableDataRef = firestoreCollection(db, `${collection}/${uid}/tableData`);
        const q = query(tableDataRef, where(documentId(), '==', monthAndYear));
        //subCollection reference to get the Ids
        const subCollectionRef = firestoreCollection(db, collection, uid, 'tableData');
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map(doc => {
                data = {...doc.data(), id: doc.id}
            })

            const querySnapshotIds = await getDocs(subCollectionRef);
            querySnapshotIds.forEach((doc) => {
                documentIds.push(doc.id);
            });

            return {data, documentIds}
        } catch (error) {
            debugger
            return error.response.data
        }
    }
);

export const getMonth = createAsyncThunk(
    'firestore/getMonth',
    async ({uid, collection}) => {
        try {
            //get all subCollection id
            const subCollectionRef = firestoreCollection(db, collection, uid, 'tableData');
            const querySnapshot = await getDocs(subCollectionRef);
            const documentIds = [];
            querySnapshot.forEach((doc) => {
                documentIds.push(doc.id);
            });
            return documentIds;
        } catch (error) {
            debugger
            return error.response.data
        }
    }
)

export const getUser = (uid, select) => {
    return new Promise(async (resolve, reject) => {
        try{
            const user = await getDoc(doc(db, select, uid))
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

export const updateTable = async (uid, data, collection, monthAndYear) => {
    const tableDataRef = firestoreCollection(db, `${collection}/${uid}/tableData`);
    const docRef = doc(tableDataRef, monthAndYear);
    try {
        await setDoc(docRef, {data: [...data]}, {merge: true})
    } catch (err) {
        debugger
        console.log(err);
    }
}



