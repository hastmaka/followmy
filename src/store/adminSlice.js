import {createSlice} from '@reduxjs/toolkit';
import {getAll} from "../helper/firebase/FirestoreApi";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        user: {},
        modal: {
            open: false,
            who: null
        },
        notification: {
            open: false,
            type: 'info',
            title: '',
            content: '',
            timeout: 0
        },
        confirmDialog: {
            open: false,
            type: '',
            title: '',
            content: '',
        },
    },
    reducers: {
        setUser(state, {payload}){state.user = {...payload}},
        openModal(state, {payload}) {
            state.modal.open = true;
            state.modal.who = payload
        },
        closeModal(state) {
            state.modal.open = false
        },

        showNotification(state, {payload}) {
            state.notification = {
                ...state.notification,
                open: true,
                timeout: payload.important ? 10000 : 3000,
                ...payload
            }
        },
        closeNotification(state) {
            state.notification = {
                ...state.notification,
                open: false
            }
        },
        showConfirmDialog(state, {payload}) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: true,
                ...payload
            }
        },
        closeConfirmDialog(state) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: false,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, {meta}) => {
            debugger
        });
        builder.addCase(getAll.fulfilled, (state, {payload, meta}) => {
            debugger

        });
        builder.addCase(getAll.rejected, (state, {meta}) => {
            debugger
        });
    }
})

export const generalSliceActions = adminSlice.actions;
export default adminSlice.reducer;
