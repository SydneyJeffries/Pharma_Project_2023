import IDelivery from './IDelivery';
import IPharmacy from './IPharmacy';

interface ISharedState {
    data: IPharmacy[] | IPharmacy | IDelivery[] | IDelivery;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: 'loading' | 'saving' | '';
    totalRowsForPagination: number
}

export default ISharedState;
