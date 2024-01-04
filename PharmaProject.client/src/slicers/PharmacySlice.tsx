/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { pharmacyService } from "../api/PharmacyService";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ISharedState from '../Interfaces/ISharedState';
import IPharmacy from '../Interfaces/IPharmacy';
import axios from 'axios'

const initialState: ISharedState = {
    data: [],
    status: 'idle',
    error: '',
    totalRowsForPagination: 0,
};

export const fetchPharmacyList = createAsyncThunk<IPharmacy[]>('pharmacy/fetchList', async (_, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
        source.cancel()
    })

    const pharmacyList = await pharmacyService.getPharmacyList();
    return [...pharmacyList];
});

export const savePharmacy = createAsyncThunk<IPharmacy>( 'pharmacy/savePharmacy',
    async (pharmacy: ISharedState) => {
        const updatedPharmacy = await pharmacyService.savePharmacy(pharmacy);
        return updatedPharmacy;
    }
);

export const PharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPharmacyList.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(fetchPharmacyList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload;
                state.error = '';
            })
            .addCase(fetchPharmacyList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'loading';
                console.log(action.error.message)
            })
            //.addCase(fetchPharmacyById.pending, (state) => {
            //    state.status = 'loading';
            //    state.error = '';
            //})
            //.addCase(fetchPharmacyById.fulfilled, (state, action) => {
            //    state.status = 'succeeded'
            //    state.data = action.payload;
            //    state.error = '';
            //})
            //.addCase(fetchPharmacyById.rejected, (state, action) => {
            //    state.status = 'failed'
            //    state.error = 'loading';
            //    console.log(action.error.message)
            //})
            .addCase(savePharmacy.pending, (state) => {
                debugger;
                state.status = 'loading';
                state.error = '';
            })
            .addCase(savePharmacy.fulfilled, (state) => {
                debugger;
                state.status = 'succeeded'
                state.error = '';
            })
            .addCase(savePharmacy.rejected, (state, action) => {
                debugger;
                state.status = 'failed'
                state.error = 'saving';
                console.log(action.error.message)
            })

    }
})

export const getPharmacyData = (state: any) => state.pharmacy.data;
export const getPharmacyStatus = (state: any) => state.pharmacy.status;
export const getPharmacyError = (state: any) => state.pharmacy.error;

export default PharmacySlice.reducer;