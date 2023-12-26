
interface IPharmacy {
    pharmacyId: number
    name: string;
    filledPerscriptions: number;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    createdDate: Date;
    updatedDate: Date;
    createdBy: string;
}



export default IPharmacy;