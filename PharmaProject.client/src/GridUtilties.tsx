/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertProps } from '@mui/material';
import { GridRowId, GridRowModesModel, GridRowModes,  GridRowEditStopParams, MuiEvent } from '@mui/x-data-grid';
import {  GridEventListener, GridRowEditStopReasons} from '@mui/x-data-grid';
import { isNumber } from '@mui/x-data-grid/internals';
import { Dispatch, SetStateAction } from 'react';

export const handleEditClick = (id: GridRowId, rowModesModel: GridRowModesModel, setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>, GridRowModes: any) => {
    if (isNumber(id)) {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
};

export const handleSaveClick = (id: GridRowId, rowModesModel: GridRowModesModel, setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>, validationErrorsRef: React.MutableRefObject<{ [key: string]: { [key: string]: boolean } }>) => {
    const rowValidationErrors = validationErrorsRef.current[id];

    // if there are no validation errors on an update
    if (rowValidationErrors === undefined && id != 0) {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        return;
    }

    // if no rows have been clicked on an new record and user tried to save
    if (rowValidationErrors === undefined) {
        document.querySelectorAll('.Mui-error').forEach(function (element) {
            element.classList.add('validation-ran');
        });
        return;
    }

    const hasRowError = Object.values(rowValidationErrors).filter((hasError) => hasError === true);

    // can return to view bc no errors
    if (hasRowError.length === 0) {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } else {
        // highlight the columns with validation errors 
        document.querySelectorAll('.Mui-error').forEach(function (element) {
            element.classList.add('validation-ran');
        });
    }
};

export const handleCancelClick = (id: GridRowId, rowModesModel: GridRowModesModel, setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>, rows: any[], setRows: Dispatch<SetStateAction<any>>, setDeleteDisabled?: Dispatch<SetStateAction<boolean>>) => {
    setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // if need to disable delete while in add new record mode
    if (setDeleteDisabled) {
        setDeleteDisabled(false)
    }
    const editedRow = rows.find((row) => row.id === id);
    
    if (editedRow?.isNew) {
        setRows(rows.filter((row) => row.id !== id));
    }
};

export const handleAddNewRecordClick = (rowModesModel: GridRowModesModel, rows: any[], setRows: Dispatch<SetStateAction<any>>, setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>,
    fieldToFocus: string, setDeleteDisabled: Dispatch<SetStateAction<boolean>>, newRow: any) => {

    // check if a new record is already beening created.
    const hasRowWithIdZero = rows.some((row) => row.id === 0);

    // don't allow delete when new record is being created bc it will mess things up
    setDeleteDisabled(true)

    // if new record isn't already being created, then you can add another one.
    if (!hasRowWithIdZero) {
        setRows((oldRows: any) => [
            newRow,
            ...oldRows,
        ]);

        setRowModesModel({
            ...rowModesModel,
            [0]: {
                mode: GridRowModes.Edit, fieldToFocus: fieldToFocus
            },
        });
    }
};

export const handleRowEditStop: GridEventListener<'rowEditStop'> = (params: GridRowEditStopParams, event: MuiEvent) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
    }
};

export const handleProcessRowUpdateError = (setSnackbar: Dispatch<SetStateAction<Pick<AlertProps, 'children' | 'severity'> | null>>) => {
    return () => {
        setSnackbar({ children: "Error saving the information. If the error persists, please call technical support.", severity: 'error' });
    };
};