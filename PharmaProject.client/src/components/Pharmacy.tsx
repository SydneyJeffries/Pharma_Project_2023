/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import useFetch from "../UseFetch";
import IPharmacy from "../Interfaces/IPharmacy";
import { useState, useEffect } from 'react';
import IState from "../Interfaces/IState";
import { useHistory } from 'react-router-dom';
import { orgin } from '../ConnectionString'
import Loader from './Loader';
import { getPharmacyStatus, getPharmacyError, getPharmacyData, fetchPharmacyById, savePharmacy } from '../features/PharmacySlice';
import { useDispatch, useSelector } from 'react-redux';

const Pharmacy = () => {

    const { id } = useParams();
 //   const fetchUrl = orgin + '/Pharmacy/' + id; 
 //   const { data, isLoading, error }: { data: IPharmacy | null, isLoading: boolean, error: boolean } = useFetch<IPharmacy>(fetchUrl);
    const stateFetchUrl = orgin + '/Pharmacy/GetStateList';
    const { data: statesData } = useFetch<IState[]>(stateFetchUrl);
    const history = useHistory();
    //const [errorSaving, setErrorSaving] = useState(false);
    const dispatch = useDispatch();
    const pharmacyData: IPharmacy = useSelector(getPharmacyData);
    const pharmacyStatus : string = useSelector(getPharmacyStatus);
    const pharmacyError = useSelector(getPharmacyError);
    const [pharmacy, setPharmacy] = useState<IPharmacy>(pharmacyData);

    useEffect(() => {
            dispatch(fetchPharmacyById(id));
    }, [])

    useEffect(() => {
        setPharmacy(pharmacyData);
    }, [pharmacyData]);


    function handleFieldChange(e: any, fieldName: any) {
        const value = e.target.value;
        setPharmacy((prevPharmacy) => ({
            ...prevPharmacy!,
            [fieldName]: value,
        }));
    }

    function RevertChanges(e: MouseEvent ) {
        e.preventDefault();
        setPharmacy(pharmacyData);
    }

    function backButton() {
        history.go(-1);
    }

    async function saveForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(savePharmacy(pharmacy));
        if (pharmacyStatus == 'succeeded') {
            history.push('/');
        }
    }

    return (
        <>
            <div className="back  mb-4 container">
                <button onClick={backButton} className="link-primary p-0"> Back </button>
            </div>
            {pharmacyError == "loading" && <div> Error loading the page. </div>}
            {pharmacyStatus == "loading" && <Loader></Loader>}
            <div className="container mb-3">  {pharmacyError == 'saving' && <span className="text-danger"> Error saving the information. </span>} &nbsp; </div>
            {pharmacy && pharmacyStatus == "succeeded" &&
                <form key={pharmacy?.pharmacyId} className="container" onSubmit={(e) => saveForm(e)} >
                    <div className="mb-3 row g-3">
                        <div className="col-md-8">
                            <label htmlFor={pharmacy?.name} className="form-label">Name</label>
                            <input type="text" className="form-control" value={pharmacy?.name} required onChange={(e) => handleFieldChange(e, 'name')} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Number of Filled Prescriptions</label>
                            <input type="number" className="form-control" value={pharmacy?.filledPerscriptions} required onChange={(e) => handleFieldChange(e, 'filledPerscriptions')} />
                        </div>
                    </div>
                    <div className="mb-5 row g-3">
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={pharmacy?.address} className="form-label">Address</label>
                            <input type="text" className="form-control" value={pharmacy?.address} required onChange={(e) => handleFieldChange(e, 'address')} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={pharmacy?.city} className="form-label">City</label>
                            <input type="text" className="form-control" value={pharmacy?.city} required onChange={(e) => handleFieldChange(e, 'city')} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={pharmacy?.stateCode} className="form-label">State</label>
                            <select value={pharmacy?.stateCode || ''} required onChange={(e) => handleFieldChange(e, 'stateCode')} className="form-select " >
                                <option value="">Select a state</option>
                                {statesData &&
                                    statesData.map((state: IState) => (
                                        <option key={state.stateCode} value={state.stateCode}>
                                            {state.stateName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-6 ">
                            <label htmlFor={pharmacy?.zip} className="form-label">Zip</label>
                            <input type="text" className="form-control" pattern=".{5}" title="Please enter exactly 5 characters for the ZIP code." value={pharmacy?.zip} required onChange={(e) => handleFieldChange(e, 'zip')} />
                        </div>
                    </div>
                    <div className="mb-3 row g-3">
                        <br></br>
                        <div className="col-md-3">
                            <button className="btn btn-primary sm-w-100 md-w-50 w-100" type="submit" > Save </button>
                        </div>
                        <div className="col-md-3">
                            <a className="btn btn-primary sm-w-100 md-w-50 w-100" onClick={(e) =>RevertChanges(e) }> Cancel </a>
                        </div>
                    </div>
                    <div className="mb-3 text-center d-block d-md-none">
                        <br></br>
                        <button onClick={backButton} className="link-primary "> Back </button>
                    </div>
                </form>

            }
        </>
    );
}

export default Pharmacy;
