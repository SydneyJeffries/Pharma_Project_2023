import IPharmacy from './IPharmacy';

interface IPharmacyState {
    pharmacys: IPharmacy[] | IPharmacy;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: boolean;
}

export default IPharmacyState;
