import {createSlice} from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
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
        openModal(state, {payload}) {
            state.modal.open = true;
            state.modal.who = payload
        },
        closeModal(state){state.modal.open = false},

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
    extraReducers: (builder) => {}
})

export const generalSliceActions = adminSlice.actions;
export default adminSlice.reducer;
