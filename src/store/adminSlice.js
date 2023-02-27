import {createSlice} from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {}
})

export const generalSliceActions = adminSlice.actions;
export default adminSlice.reducer;
