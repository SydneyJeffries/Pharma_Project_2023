export interface IWarehouse {
    warehouseId: number;
    name: string;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    active: boolean;
    createdBy: Date;
    createdDate: Date; 
    updatedDate?: string | null; 
    updatedBy?: string | null;
}

export default IWarehouse;