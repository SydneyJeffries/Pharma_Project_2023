export interface IDelivery  {
    Id: number;
    WarehouseId: number;
    PharmacyId: number;
    DrugId: number;
    UnitCount: number;
    UnitPrice: number;
    TotalPrice?: number;
    DeliveryDate: Date;
}

export default IDelivery;