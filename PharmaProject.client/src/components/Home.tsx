/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyData, getPharmacyStatus, getPharmacyError, fetchPharmacyList, savePharmacy } from '../slicers/PharmacySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridEventListener, GridRowEditStopReasons, GridRowModel, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import IPharmacy from '../Interfaces/IPharmacy';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps } from '@mui/material';
import useFetch from '../UseFetch';
import IState from '../Interfaces/IState';
import { handleEditClick, handleSaveClick, handleCancelClick } from '../GridUtilties';

const Home = () => {
    const dispatch = useDispatch();
    const pharmacyList = useSelector(getPharmacyData);
    const pharmacyStatus = useSelector(getPharmacyStatus);
    const pharmacyError = useSelector(getPharmacyError);
    const [rows, setRows] = React.useState(pharmacyList);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const validationErrorsRef = React.useRef<{ [key: string]: { [key: string]: boolean } }>({});
    const stateFetchUrl = '/Lookup/GetStateList';
    const { data: statesData } = useFetch<IState[]>(stateFetchUrl);
    const [stateKeys, setStateKeys] = React.useState<string[]>([]);

    useEffect(() => {
        setRows(pharmacyList);
    }, [pharmacyList]);

    useEffect(() => {
        if (statesData) {
            const stateCodes = statesData.map(item  => item.stateCode);
            setStateKeys([...stateCodes]);
        }

    }, [statesData]);

    useEffect(() => {
        dispatch(fetchPharmacyList());
        console.log(pharmacyList);
    }, []);

    const handleEdit = handleEditClick(rowModesModel, setRowModesModel, GridRowModes);

    const handleSave = handleSaveClick(rowModesModel, setRowModesModel, validationErrorsRef);

    const handleCancel = handleCancelClick(rowModesModel, setRowModesModel, rows, setRows);

    /*    renderHeader: () => (<strong>{'Pharmacist'}</strong>), width: 75, flex: 1}*/
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps,  'children' | 'severity'> | null>(null);

    const columns: GridColDef[] = [
        {
            field: "name", headerName: "Name", editable: true, hideable: true, width: 200,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    name: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "address", headerName: "Address", editable: true, hideable: true, width: 200,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    address: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "city", headerName: "City", editable: true, hideable: true, width: 100,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    city: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "stateCode", headerName: "State", editable: true, hideable: true, width: 100, headerAlign: "center", align: "center", type: "singleSelect", valueOptions: [...stateKeys],
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    state: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "zip", headerName: "Zip Code", editable: true, hideable: true, width: 100, headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length != 5;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    zip: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "filledPerscriptions", headerName: "Prescriptions Filled", editable: true, hideable: true, width: 200, type: "number", headerAlign: "center", align: "center",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value < 0 || params.props.value == null;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    filledPerscriptions: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "createdDateTest", headerName: "Created Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: any) => {
                return new Date(params.row.createdDate)
            }
        },
        {
            field: "updatedDate", headerName: "Updated Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: any) => {
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
                            onClick={()=> handleSave(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={()=> handleCancel(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEdit(id)}
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

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            //@ts-expect-error
            const returnedPharmacy = await dispatch(savePharmacy(newRow));
            setSnackbar({ children: 'Successfully saved', severity: 'success' });
            return returnedPharmacy.payload;
        },
        //@ts-expect-error
        [dispatch(savePharmacy)],
    );

    const handleProcessRowUpdateError = React.useCallback(() => {
        setSnackbar({ children: "Error saving the information. If the error persists, please call technical support.", severity: 'error' });
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    return (
        <div className="flex-col" >

            {pharmacyError === 'loading' && (
                <div className="text-danger text-center">Error loading the page.</div>
            )}
            {pharmacyStatus === 'loading' && <Loader></Loader>}
            {pharmacyList.length > 0 && (
                <>
                    <DataGrid
                        rows={pharmacyList}
                        columns={columns}
                        getRowId={(row) => row.pharmacyId}
                        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
                        hideFooterPagination={true}
                        hideFooterSelectedRowCount={true}
                        disableColumnMenu={false}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowEditStop={handleRowEditStop}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                    />
                    {!!snackbar && (
                        <Snackbar
                            open
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}  >
                            <Alert {...snackbar}
                                onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;