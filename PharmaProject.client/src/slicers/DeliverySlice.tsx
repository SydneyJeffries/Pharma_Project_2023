/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeliveryService } from "../api/DeliveryService";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ISharedState from '../Interfaces/ISharedState';
import axios from 'axios'
import IDelivery from "../Interfaces/IDelivery";
import Delivery from "../components/Delivery";

const initialState: ISharedState = {
    data: [],
    status: 'idle',
    error: '',
    totalRowsForPagination: 0,
};

export const GetDeliveryList = createAsyncThunk<IDelivery[], { pageNumber: number, pageSize: number, pharmacyId?: number, warehouseId?: number }>(
    'delivery/GetDeliveryList',
    async ({ pageNumber, pageSize, pharmacyId, warehouseId }, { signal }) => {
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        const deliveryList: any = await DeliveryService.getDeliveryList(pageNumber, pageSize, pharmacyId, warehouseId);
        return deliveryList;
    }
);

export const SaveDelivery = createAsyncThunk<IDelivery>('delivery/SaveDelivery',
    async (delivery: IDelivery) => {
        const result = await DeliveryService.saveDelivery(delivery);
        return result;
    }
);

export const DeleteDelivery = createAsyncThunk<IDelivery>('delivery/DeleteDelivery',
    async (delivery: IDelivery) => {
        const result = await DeliveryService.deleteDelivery(delivery);
        return result;
    }
);

export const DeliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(GetDeliveryList.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(GetDeliveryList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload.data.data;
                state.error = '';
                debugger;
                state.totalRowsForPagination = action.payload.data.totalCount;
            })
            .addCase(GetDeliveryList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'loading';
                console.log(action.error.message)
            })
            .addCase(SaveDelivery.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(SaveDelivery.fulfilled, (state) => {
                state.status = 'succeeded'
                state.error = '';
            })
            .addCase(SaveDelivery.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'saving';
                console.log(action.error.message)
            })
            .addCase(DeleteDelivery.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(DeleteDelivery.fulfilled, (state) => {
                state.status = 'succeeded'
                state.error = '';
            })
            .addCase(DeleteDelivery.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'saving';
                console.log(action.error.message)
            })

    }
})

export const getDeliveryData = (state: any) => state.delivery.data;
export const getDeliveryStatus = (state: any) => state.delivery.status;
export const getDeliveryError = (state: any) => state.delivery.error;
export const getTotalRowsForPagination = (state: any) => state.delivery.totalRowsForPagination;

export default DeliverySlice.reducer;