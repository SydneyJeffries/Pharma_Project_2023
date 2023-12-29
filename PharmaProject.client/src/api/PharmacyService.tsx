import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import  IPharmacy  from "../Interfaces/IPharmacy";
import { orgin } from '../ConnectionString';
import IResponse from '../Interfaces/IResponse';

const requestConfig: AxiosRequestConfig = {
    /*  baseURL: import.meta.env.VITE_BASE_URL*/
    baseURL: orgin
}

const getPharmacyListUrl = '/Pharmacy';
//const getPharmacyByIdUrl = orgin + '/Pharmacy/'
const savePharmacyUrl =  '/Pharmacy/';


export const pharmacyService = {

    async getPharmacyList(): Promise<IPharmacy[]> {
        const response: AxiosResponse<IPharmacy[]> = await axios.get(getPharmacyListUrl, requestConfig);
        return response.data;
    },

    async savePharmacy(pharmacy: IPharmacy): Promise<IPharmacy> {
        const response: AxiosResponse<IPharmacy> = await axios.post(savePharmacyUrl, pharmacy, requestConfig);
        return response.data;
    }
}