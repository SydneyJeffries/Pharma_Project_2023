/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { orgin } from '../ConnectionString';
import axios from 'axios';
import IPharmacyState from '../Interfaces/IPharmacyState';
import IPharmacy from '../Interfaces/IPharmacy';


const getPharmacyListUrl = orgin + '/Pharmacy';
const getPharmacyByIdUrl = orgin + '/Pharmacy/'
const savePharmacyUrl = orgin + '/Pharmacy/';

const initialState: IPharmacyState = {
    data: [],
    status: 'idle',
    error: false
};


export const fetchPharmacyList = createAsyncThunk('pharmacy/fetchPharmacyList', async(_, { signal }) => {
    try {
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', () => {
            source.cancel()
        })

        const response = await axios.get(getPharmacyListUrl, {
            cancelToken: source.token,
        })

        return [...response.data];

    } catch (err: any) {
        console.log(err.message);
    }
});

export const savePharmacy = createAsyncThunk('pharmacy/savePharmacy', async (updatedPharmacyData: IPharmacy) => {
    try {
        const response = await axios.post(savePharmacyUrl, updatedPharmacyData);
        return response.data;

    } catch (err: any) {
        console.log(err.message)
    }
});

export const fetchPharmacyById = createAsyncThunk('phamacy/fetchPharmacyById',
    async (pharmacyId: string, { signal }) => {
        try {
            const source = axios.CancelToken.source()
            signal.addEventListener('abort', () => {
                source.cancel()
            })
            const response = await axios.get(`${getPharmacyByIdUrl + pharmacyId}`, {
                cancelToken: source.token,
            })

            return response.data

        } catch (err: any) {
            console.log(err.message);
        }
    }
)

    export const PharmacySlice = createSlice({
        name: 'pharmacy',
        initialState,
        reducers: {

        },
        extraReducers(builder) {
            builder
                .addCase(fetchPharmacyList.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchPharmacyList.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.data = action.payload;
                })
                .addCase(fetchPharmacyList.rejected, (state) => {
                    state.status = 'failed'
                    state.error = 'loading';
                })
                .addCase(fetchPharmacyById.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchPharmacyById.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.data = action.payload;
                })
                .addCase(fetchPharmacyById.rejected, (state) => {
                    state.status = 'failed'
                    state.error = 'loading';
                })
                .addCase(savePharmacy.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(savePharmacy.fulfilled, (state, ) => {
                    state.status = 'succeeded'
                })
                .addCase(savePharmacy.rejected, (state) => {
                    state.status = 'failed'
                    state.error = 'saving';
                })
        }
    })


    export const getPharmacyData = (state: any) => state.pharmacy.data;
    export const getPharmacyStatus = (state: any) => state.pharmacy.status;
    export const getPharmacyError = (state: any) => state.pharmacy.error;
    

    export default PharmacySlice.reducer;