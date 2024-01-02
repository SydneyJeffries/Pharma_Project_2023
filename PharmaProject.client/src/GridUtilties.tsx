/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryData, getDeliveryStatus, getDeliveryError, GetDeliveryList, SaveDelivery, DeleteDelivery } from '../slicers/DeliverySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridEventListener, GridRowEditStopReasons, GridRowModel, GridPreProcessEditCellProps, ValueOptions, GridToolbarContainer } from '@mui/x-data-grid';
import IDelivery from '../Interfaces/IDelivery';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps, Button } from '@mui/material';
import UsePagination from "../UsePagination";
import IWarehouse from "../Interfaces/IWarehouse";
import useFetch from '../UseFetch';
import { fetchPharmacyList } from '../slicers/PharmacySlice';
import IPharmacy from '../Interfaces/IPharmacy';
import IDrug from '../Interfaces/IDrug';

export const handleEditClick = (
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
    GridRowModes: typeof GridRowModes
) => (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};

export const handleSaveClick = (
    id: GridRowId,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
    validationErrorsRef: React.MutableRefObject<{[key: string]: {[key: string]: boolean}}>
    ) => () => {
    const rowValidationErrors = validationErrorsRef.current[id];
    if (rowValidationErrors === undefined) {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } else {
        const hasRowError = Object.values(rowValidationErrors).filter((hasError) => hasError === true);
        if (hasRowError.length === 0) {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }
    }
};