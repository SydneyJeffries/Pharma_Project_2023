import IPharmacy from './IPharmacy';

interface IPharmacyState {
    data: IPharmacy[] | IPharmacy;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: 'loading' | 'saving';
}

export default IPharmacyState;
