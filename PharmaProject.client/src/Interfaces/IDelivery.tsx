export interface IDelivery {
    Id: number;
    deliveryId: number;
    warehouseId: number;
    pharmacyId: number;
    drugId: number;
    unitCount: number;
    unitPrice: number;
    totalPrice?: number;
    deliveryDate: Date;
    updatedDate: null | Date;
    createdDate: Date;
    warehouseName: string;
    pharmacyName: string;
    active: boolean;
    createdBy: string;
    updatedBy: string | null;
}

export default IDelivery;