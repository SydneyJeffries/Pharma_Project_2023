export interface IPharmacy {
    pharmacyId: number
    name: string;
    filledPerscriptions: number;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    createdDate: Date;
    updatedDate?: Date | null;
    updateby?: string | null;
    createdBy: string;
    id: number;

}

export default IPharmacy;
