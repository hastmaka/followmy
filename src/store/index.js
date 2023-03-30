import {configureStore} from '@reduxjs/toolkit';
import adminSlice from './adminSlice'

const store = configureStore({
    reducer: {
        admin: adminSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
})

export default store;