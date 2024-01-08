import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { IDelivery } from "../Interfaces/IDelivery";

const requestConfig: AxiosRequestConfig = {
     baseURL: import.meta.env.VITE_BASE_URL
}

//const getPharmacyByIdUrl = orgin + '/Pharmacy/'

export const DeliveryService = {

    async getDeliveryList(pageNumber: number, pageSize: number, pharmacyId?: number, warehouseId?: number): Promise<IDelivery[]> {
        const getDeliveryListUrl = `/Delivery/${pageNumber}/${pageSize}/${pharmacyId ?? ''}/${warehouseId ?? ''}`;
        const response: AxiosResponse<IDelivery[]> = await axios.get(getDeliveryListUrl, requestConfig);
        return response;
    },

    async saveDelivery(delivery: IDelivery): Promise<IDelivery> {
        const saveDeliveryUrl = '/Delivery/';
        console.log(delivery);
        const response: AxiosResponse<IDelivery> = await axios.post(saveDeliveryUrl, delivery, requestConfig);
        return response.data;
    },

    async deleteDelivery(delivery: IDelivery): Promise<IDelivery> {
        const deleteDeliveryUrl = 'Delivery/DeleteDelivery/';
        const response: AxiosResponse<IDelivery> = await axios.post(deleteDeliveryUrl, delivery, requestConfig);
        return response.data;
    }

}