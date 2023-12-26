/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { orgin } from '../ConnectionString';
import axios from 'axios';
import IPharmacyState from '../Interfaces/IPharmacyState';


const getPharmacyListUrl = orgin + '/Pharmacy';
const getPharmacyByIdUrl = orgin + '/Pharmacy/'

const initialState: IPharmacyState = {
    data: [],
    status: 'idle',
    error: false
};

export const fetchPharmacyList = createAsyncThunk('pharmacys/fetchPharmacyList', async () => {
    debugger;
    try {
        const response = await axios.get(getPharmacyListUrl);
        return [...response.data];

    } catch (err: any) {
        console.log(err.message);
    }
});

export const fetchPharmacyById = createAsyncThunk('phamacys/fetchPharmacyById',
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
                    state.data = action.payload;
                })
                .addCase(fetchPharmacyList.rejected, (state) => {
                    state.status = 'failed'
                    state.error = true;
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
                    state.error = true;
                })
        }
    })


    export const getPharmacyData = (state: any) => state.pharmacy.data;
    export const getPharmacyStatus = (state: any) => state.pharmacy.status;
    export const getPharmacyError = (state: any) => state.pharmacy.error;

    export default PharmacySlice.reducer;