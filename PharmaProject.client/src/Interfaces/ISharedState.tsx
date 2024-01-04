import IDelivery from './IDelivery';
import IPharmacy from './IPharmacy';

interface ISharedState {
    data: IPharmacy[]  | IDelivery[] ;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: 'loading' | 'saving' | '';
    totalRowsForPagination: number
    singleData: IPharmacy | IDelivery | null | undefined;
}

export default ISharedState;
