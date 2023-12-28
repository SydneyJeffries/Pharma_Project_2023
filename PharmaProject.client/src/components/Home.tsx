/* eslint-disable @typescript-eslint/no-unused-vars */
/*import { Link } from "react-router-dom";*/
//import IPharmacy from '../Interfaces/IPharmacy';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyData, getPharmacyStatus, getPharmacyError, fetchPharmacyList } from '../slicers/PharmacySlice';
import { useEffect } from 'react';
//import Table from "@mui/material/Table";
//import TableBody from "@mui/material/Table";
//import TableCell from "@mui/material/TableCell";
//import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
//import TableRow from "@mui/material/TableRow";
//import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IPharmacy from '../Interfaces/IPharmacy';

const Home = () => {
    const dispatch = useDispatch();
    const pharmacyList = useSelector(getPharmacyData);
    const pharmacyListStatus = useSelector(getPharmacyStatus);
    const pharmacyListError = useSelector(getPharmacyError);


    useEffect(() => {
        dispatch(fetchPharmacyList());
        console.log(pharmacyList)
    }, [])

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", editable: true, hideable: true, width: 200 },
        { field: "address", headerName: "Address", editable: true, hideable: true, width: 200 },
        { field: "city", headerName: "City", editable: true, hideable: true, width: 150 },
        { field: "stateCode", headerName: "State", editable: true, hideable: true, width: 150 },
        { field: "filledPerscriptions", headerName: "Prescriptions Filled", editable: true, hideable: true, width: 150, type: 'number' },
        {
            field: "createdDate", headerName: "Created Date", editable: false, hideable: true, width: 170, type: 'date', 
            valueGetter: (params: IPharmacy) => {
                return new Date(params.createdDate)
            }
        },
        {
            field: "updatedDate", headerName: "Updated Date", editable: false, hideable: true, width: 170, type: 'date', valueGetter: (params: IPharmacy) => {
           return new Date(params.updatedDate);
            }
        }
    ]



    return (
        <>
            {pharmacyListError === "loading" && <div className="text-danger">Error loading the page.</div>}
            {pharmacyListStatus === "loading" && <Loader></Loader>}
            {pharmacyList.length > 0 && (

                <DataGrid  rows={pharmacyList} columns={columns} getRowId={(row) => row.pharmacyId} />
       
            )}
        </>
    );
}

export default Home;
