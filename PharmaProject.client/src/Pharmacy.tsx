/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import useFetch from "./UseFetch"
import IPharmacy from "../Interfaces/IPharmacy";
import { useState, useEffect } from 'react';
import IState from "../Interfaces/IState";
import { useHistory } from 'react-router-dom';

const Pharmacy = () => {
    // const [count, setCount] = useState(0)
    //@ts-expect-error ignore
    //Todo: get urls for api
    const { id } = useParams
    const fetchUrl = 'https://localhost:7137' + '/Pharmacy/' + '?pharmacyId=' + id;
    const { data, isLoading, error }: { data: IPharmacy | null, isLoading: boolean, error: boolean } = useFetch<IPharmacy>(fetchUrl);
    const [pharmacy, setPharmacy] = useState<IPharmacy | null>(null);
    const stateFetchUrl = 'https://localhost:7137' + '/Pharmacy/GetStateList';
    const { data: statesData } = useFetch<IState[]>(stateFetchUrl);
    const history = useHistory();
    const [errorSaving, setErrorSaving]  = useState(false);

    useEffect(() => {
        if (data) {
            setPharmacy(data);
        }
    }, [data]);

    function handleFieldChange(e: any, fieldName: any) {
        const value = e.target.value;
        debugger;
        setPharmacy((prevPharmacy) => ({
            ...prevPharmacy!,
            [fieldName]: value,
        }));
    }

    async function saveForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const savePharmacyUrl = window.location.origin + '/Pharmacy/';
        try {
            const response = await fetch(savePharmacyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pharmacy),
            });

            if (response.ok) {
                history.push('/')

            } else {
                const errorMessage = await response.text();
                setErrorSaving(true);
                console.error('Failed to save pharmacy:', errorMessage);
            }
        } catch (error) {
            setErrorSaving(true);
            console.error('An error occurred:', error);
        }
    }

    return (
        <>
            {error && <div> Error loading the page. </div>}
            {isLoading && <div> Loading... </div>}
            {errorSaving && <div> Error saving the information. </div> }
            {data &&
                //Todo: include uneditable fields such as created by and date and last edited by 
                // Todo: make styles for error, and isloading in a component.
                <form key={data.pharmacyId} className="container" onSubmit={(e) => saveForm(e)} >
                    <div className="mb-3 row">
                        <div className="col-md-8">
                            <label htmlFor={data.name} className="form-label">Name</label>
                            <input type="text" className="form-control" value={data.name} required onChange={(e) => handleFieldChange(e, 'name')} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor={data.filledPerscriptions.toString()} className="form-label">Number of Filled Prescriptions</label>
                            <input type="number" className="form-control" value={data.filledPerscriptions} required onChange={(e) => handleFieldChange(e, 'filledPerscriptions')} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={data.address} className="form-label">Address</label>
                            <input type="text" className="form-control" value={data.address} required onChange={(e) => handleFieldChange(e, 'address')} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={data.city} className="form-label">City</label>
                            <input type="text" className="form-control" value={data.address} required onChange={(e) => handleFieldChange(e, 'city')} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={data.city} className="form-label">State</label>
                            <select value={data.stateCode || ''} required onChange={(e) => handleFieldChange(e, 'stateCode')}>
                                <option value="">Select a state</option>
                                {statesData &&
                                    statesData.map((state: IState) => (
                                        <option key={state.stateCode} value={state.stateCode}>
                                            {state.stateName}
                                        </option>
                                    ))}
                            </select>
                            <input type="text" className="form-control" value={data.address} required onChange={(e) => handleFieldChange(e, 'state')} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <label htmlFor={data.zip} className="form-label">Zip</label>
                            <input type="text" className="form-control" value={data.address} required onChange={(e) => handleFieldChange(e, 'zip')} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary mx-auto inline-block" type="submit"> Save </button>
                    </div>
                </form>

            }
        </>
    );
}

export default Pharmacy
