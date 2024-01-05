/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux';
import { getPharmacySingleData, getPharmacy } from '../slicers/PharmacySlice';
import IPharmacy from '../Interfaces/IPharmacy';
import { Box, Modal } from '@mui/material';
import useFetch from '../UseFetch';
import Loader from './Loader';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid grey',
    p: 4,
};

const PharmacyCard = () => {
    const dispatch = useDispatch();
    const selectedPharmacy: IPharmacy = useSelector(getPharmacySingleData);
    const { data: pharmasistList, isLoading, error } = useFetch<any[]>(`/Pharmacist/${selectedPharmacy.id}`);

    function onClickClose() {
        // reset selected pharmacy to nothing
        dispatch(getPharmacy(null));
    }

    return (
        <>
            <Modal
                open={true}
                onClose={() => onClickClose()} aria-labelledby="modal-modal-title"  aria-describedby="modal-modal-description" >
                <div className="bg-white font-reg">
                    <Box sx={style} >
                        <div className="font-reg bold mb-2  pb-2 px-1">
                            <span className="bold">{selectedPharmacy.name} Pharmacists </span>
                        </div>
                        <div className="font-reg">
                            {isLoading && <Loader />}
                            {error && <span className="text-danger"> Error </span>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Hired Date</th>
                                        <th scope="col">Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pharmasistList && pharmasistList.length > 0 &&
                                        pharmasistList.map(pharmacist => (
                                            <tr>
                                                <td> {pharmacist.fullName}</td>
                                                <td> {new Date(pharmacist.dateOfHire).toLocaleDateString()}</td>
                                                <td> {pharmacist.age}</td>
                                            </tr>
                                        ))
                                    }                                 
                                </tbody>
                            </table>                           
                        </div>
                    </Box>
                </div>
            </Modal>
        </>
    );
};

export default PharmacyCard;

