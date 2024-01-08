export interface IWarehouse {
    warehouseId: number;
    name: string;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    active: boolean;
    createdBy: string;
    createdDate: Date;
    updatedDate?: Date | null; 
    updatedBy?: string | null;
}

