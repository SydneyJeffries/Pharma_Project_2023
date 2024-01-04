/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { pharmacyService } from "../api/PharmacyService";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import ISharedState from '../Interfaces/ISharedState';
import IPharmacy from '../Interfaces/IPharmacy';
import axios from 'axios'

const initialState: ISharedState = {
    data: [],
    status: 'idle',
    error: '',
    totalRowsForPagination: 0,
    singleData: null,
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

//export const getPharmacy = createAsyncThunk<IPharmacy>('pharmacy/getPharmacy', async (id : number, { signal }) => {
//    const source = axios.CancelToken.source()
//    signal.addEventListener('abort', () => {
//        source.cancel()
//    })

//    const pharmacy = await pharmacyService.GetPharmacy(id);
//    return pharmacy;
//});


export const PharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        getPharmacy(state, action: PayloadAction<number | null>) {
            debugger;
            if (action.payload != null) {
                const selectedPharmacy = state.data.find(pharmacy => pharmacy.id === action.payload);
                state.singleData = selectedPharmacy;
            } else {
                state.singleData = null;
            }
        }   
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
            //.addCase(getPharmacy.pending, (state) => {
            //    state.status = 'loading';
            //    state.error = '';
            //})
            //.addCase(getPharmacy.fulfilled, (state, action) => {
            //    state.status = 'succeeded'
            //    state.singleData = action.payload;
            //    state.error = '';
            //})
            //.addCase(getPharmacy.rejected, (state, action) => {
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

export const { getPharmacy } = PharmacySlice.actions;
export const getPharmacyData = (state: any) => state.pharmacy.data;
export const getPharmacyStatus = (state: any) => state.pharmacy.status;
export const getPharmacyError = (state: any) => state.pharmacy.error;
export const getPharmacySingleData = (state: any) => state.pharmacy.singleData;

export default PharmacySlice.reducer;