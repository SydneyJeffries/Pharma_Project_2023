import IPharmacy from './IPharmacy';

interface IPharmacyState {
    data: IPharmacy[] | IPharmacy;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: boolean;
}

export default IPharmacyState;
