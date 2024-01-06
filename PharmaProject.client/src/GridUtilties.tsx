/* eslint-disable @typescript-eslint/no-explicit-any */
import {  GridRowId, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';

export const handleEditClick = (   rowModesModel: GridRowModesModel, setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>, GridRowModes: any) => (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};

export const handleSaveClick = (rowModesModel: GridRowModesModel,setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,validationErrorsRef: React.MutableRefObject<{ [key: string]: { [key: string]: boolean } }>) => (id: GridRowId) => {
    const rowValidationErrors = validationErrorsRef.current[id];
        if (rowValidationErrors === undefined && id != 0) {
            // if there are no validation errors on an update
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        } else {
            const hasRowError = Object.values(rowValidationErrors).filter((hasError) => hasError === true);
            
            if (hasRowError.length === 0) {
                // can return to view bc no errors
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
            } else {
                // highlight the columns with validation errors 
                document.querySelectorAll('.Mui-error').forEach(function (element) {
                    element.classList.add('validation-ran');
                });
            }
        }
};

export const handleCancelClick = (rowModesModel: GridRowModesModel, setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>, rows: any[], setRows: React.Dispatch<React.SetStateAction<any>>, setDeleteDisabled? : any) => (id: GridRowId) => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        if (setDeleteDisabled) {
            setDeleteDisabled(false)
        }
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
};

