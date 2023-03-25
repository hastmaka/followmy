import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where
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
            if (collection === 'product') {
                return {...data.data(), id: id}
            }
            return data.data();
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAll = createAsyncThunk(
    'firestore/getAll',
    async ({collection, filters = [], lim = null}, {rejectWithValue}) => {
        let queries = [];
        if (filters.length) {
            for (const filter of filters) {
                queries.push(where(filter.field, filter.operator, filter.value));
            }
        }
        let q = query(firestoreCollection(db, collection), ...queries);
        try {
            let data = [];
            let res = await getDocs(q);
            res.docs.map(doc => {
                data.push({...doc.data(), id: doc.id});
            })
            debugger
            return data
        } catch (error) {
            debugger
            return rejectWithValue(error.response.data);
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



