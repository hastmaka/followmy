import {createSlice} from '@reduxjs/toolkit';
import {getById, getUserTableData, updateTable} from "../helper/firebase/FirestoreApi";

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
        userStatus: {loaded: false, loading: false},
        tableDataStatus: {loaded: false, loading: false}
    },
    reducers: {
        setUser(state, {payload}){
            state.user = {...payload}
            state.userStatus.loaded = true;
        },
        createNewRecordInUserTable(state, {payload}) {
            state.user.tableData.data = [...state.user.tableData.data, payload]
            updateTable(state.user.uid, state.user.tableData.data)
        },
        updateUserTable(state, {payload}) {
            const indexTpUpdate = state.user.tableData.data.findIndex(item => item.id === payload.id)
            state.user.tableData.data[indexTpUpdate] = payload
            updateTable(state.user.uid, state.user.tableData.data)
        },
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
        builder.addCase(getById.pending, (state, {meta}) => {
            switch (meta.arg.collection) {
                case 'users':
                    state.userStatus.loading = true;
                    break;
                default:
                    return;
            }
        });
        builder.addCase(getById.fulfilled, (state, {payload, meta}) => {
            switch (meta.arg.collection) {
                case 'users':
                    state.user = {...payload}
                    state.userStatus.loaded = true;
                    break;
                default:
                    return;
            }

        });
        builder.addCase(getById.rejected, (state, {meta, payload}) => {
            state.message = payload;
            state.userStatus.loaded = false;
        });

        builder.addCase(getUserTableData.pending, (state, {meta}) => {
            state.tableDataStatus.loading = true;
        });
        builder.addCase(getUserTableData.fulfilled, (state, {payload, meta}) => {
            state.user.tableData = {...payload}
            state.tableDataStatus.loaded = true;
        });
        builder.addCase(getUserTableData.rejected, (state, {meta, payload}) => {
            state.message = payload;
            state.tableDataStatus.loaded = false;
        });
    }
})

export const generalSliceActions = adminSlice.actions;
export default adminSlice.reducer;
