/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { orgin } from '../ConnectionString';
import axios from 'axios';
import IPharmacyState from '../Interfaces/IPharmacyState';

const getUrl = orgin + '/Pharmacy';


const initialState: IPharmacyState = {
        pharmacys: [],
        status: 'idle',
        error: false  
}

export const fetchPharmacyList = createAsyncThunk('pharmacys/fetchPharmacyList', async () => {
    debugger;
    try {
        const response = await axios.get(getUrl);
        return [...response.data];

    } catch (err: any) {
        console.log(err.message);
    }

})

export const PharmacyListSlice = createSlice({
    name: 'pharmacys',
    initialState,
    reducers: {
        //getPharmacy: (state: any, action: { payload: any }) => {
        //    const data = {
        //        id: nanoid,
        //        text: action.payload,
        //    }

        //},
        //updatePharmacy: (state, action) => {
        //    state.todo
        //}
    }, 
    extraReducers(builder) {
        builder
            .addCase(fetchPharmacyList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPharmacyList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.pharmacys = action.payload;
            })
            .addCase(fetchPharmacyList.rejected, (state) => {
                state.status = 'failed'
                state.error = true;
            })

    }
})


export const getPharmacyList = (state: any) => state.pharmacys.pharmacys;
export const getPharmacyListStatus = (state: any) => state.pharmacys.status;
export const getPharmacyListError = (state: any) => state.pharmacys.error;

export default PharmacyListSlice.reducer;