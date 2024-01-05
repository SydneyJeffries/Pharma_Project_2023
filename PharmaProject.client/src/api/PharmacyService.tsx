import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import  IPharmacy  from "../Interfaces/IPharmacy";

const requestConfig: AxiosRequestConfig = {
     baseURL: import.meta.env.VITE_BASE_URL
}

export const pharmacyService = {

    async getPharmacyList(): Promise<IPharmacy[]> {
        const getPharmacyListUrl = '/Pharmacy';
        const response: AxiosResponse<IPharmacy[]> = await axios.get(getPharmacyListUrl, requestConfig);
        return response.data;
    },

    async savePharmacy(pharmacy: IPharmacy): Promise<IPharmacy> {
        const savePharmacyUrl = '/Pharmacy/';
        const response: AxiosResponse<IPharmacy> = await axios.post(savePharmacyUrl, pharmacy, requestConfig);
        return response.data;
    }
}