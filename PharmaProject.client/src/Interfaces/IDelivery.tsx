export interface IDelivery  {
    Id: number;
    deliveryId: number;
    warehouseId: number;
    pharmacyId: number;
    drugId: number;
    unitCount: number;
    unitPrice: number;
    totalPrice?: number;
    deliveryDate: Date;
    warehouseName: string;
    pharmacyName: string;
}

export default IDelivery;