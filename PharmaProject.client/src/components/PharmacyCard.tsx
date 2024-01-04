/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux';
import { getPharmacySingleData, getPharmacy } from '../slicers/PharmacySlice';
import IPharmacy from '../Interfaces/IPharmacy';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const PharmacyCard = () => {
    const dispatch = useDispatch();
    const selectedPharmacy: IPharmacy = useSelector(getPharmacySingleData);

    function onClickClose() {
        
        dispatch(getPharmacy(null));
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Card sx={{ minWidth: 305 }} className="mb-4 relative">
                    <CardContent className="">
                        <CardActions className="close">
                            <Button size="small" onClick={() => onClickClose()}>X</Button>
                        </CardActions>

                        <Typography className="bold" component="div">
                            {selectedPharmacy.name}
                        </Typography>

                        <div>
          
                        </div>

                    </CardContent>
                </Card>
            </div>

        </>
    );
};

export default PharmacyCard;

