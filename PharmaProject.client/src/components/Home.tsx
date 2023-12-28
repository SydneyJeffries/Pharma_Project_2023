/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyData, getPharmacyStatus, getPharmacyError, fetchPharmacyList, savePharmacy } from '../slicers/PharmacySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridEventListener, GridRowEditStopReasons, GridRowModel } from '@mui/x-data-grid';
import IPharmacy from '../Interfaces/IPharmacy';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { AlertProps } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    const pharmacyList = useSelector(getPharmacyData);
    const pharmacyListStatus = useSelector(getPharmacyStatus);
    const pharmacyListError = useSelector(getPharmacyError);
    const [rows, setRows] = React.useState(pharmacyList);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    useEffect(() => {
        setRows(pharmacyList);
    }, [pharmacyList]);

    useEffect(() => {
        dispatch(fetchPharmacyList());
        console.log(pharmacyList);
    }, []);

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };


    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'> | null>(null);


    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", editable: true, hideable: true, width: 200 },
        { field: "address", headerName: "Address", editable: true, hideable: true, width: 200 },
        { field: "city", headerName: "City", editable: true, hideable: true, width: 150 },
        { field: "stateCode", headerName: "State", editable: true, hideable: true, width: 100, headerAlign: "center", align: "center" },
        { field: "filledPerscriptions", headerName: "Prescriptions Filled", editable: true, hideable: true, width: 200, type: "number", headerAlign: "center", align: "center" },
        {
            field: "createdDateTest", headerName: "Created Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: IPharmacy) => {
                return new Date(params.row.createdDate)
            }
        },
        {
            field: "updatedDate", headerName: "Updated Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: IPharmacy) => {
                return params.row.updatedDate ? new Date(params.row.updatedDate) : null;
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ]

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedPharmacyRecord = dispatch(savePharmacy(newRow));
        return updatedPharmacyRecord.arg;
    };

    return (
        <>
            {pharmacyListError === 'loading' && (
                <div className="text-danger">Error loading the page.</div>
            )}
            {pharmacyListStatus === 'loading' && <Loader></Loader>}
            {pharmacyList.length > 0 && (
                <DataGrid
                    rows={pharmacyList}
                    columns={columns}
                    getRowId={(row) => row.pharmacyId}
                    processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
                    hideFooterPagination={true}
                    hideFooterSelectedRowCount={true}
                    loading={pharmacyListStatus === 'loading'}
                    disableColumnMenu={false}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            )}
        </>
    );
};

export default Home;