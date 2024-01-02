/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryData, getDeliveryStatus, getDeliveryError, GetDeliveryList, SaveDelivery } from '../slicers/DeliverySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridEventListener, GridRowEditStopReasons, GridRowModel, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import IDelivery from '../Interfaces/IDelivery';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps } from '@mui/material';
import UsePagination from "../UsePagination";

const Delivery = () => {
    const dispatch = useDispatch();
    const deliveryList = useSelector(getDeliveryData);
    const deliveryStatus = useSelector(getDeliveryStatus);
    const deliveryError = useSelector(getDeliveryError);
    //const [rows, setRows] = React.useState(deliveryList);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
   // const validationErrorsRef = React.useRef<{ [key: string]: { [key: string]: boolean } }>({});
    const { paginationModel, handlePaginationModelChange } = UsePagination({ page: 0, pageSize: 15 });
    //const stateFetchUrl = '/Pharmacy/GetStateList';
    //const { data: statesData } = useFetch<IState[]>(stateFetchUrl);
    //const [stateKeys, setStateKeys] = React.useState<string[]>([]);

    useEffect(() => {
        setRows(deliveryList);
    }, [deliveryList]);


    useEffect(() => {
        dispatch(GetDeliveryList(0, 10, null, null));
        console.log(deliveryList);
    }, []);

    //const handleEditClick = (id: GridRowId) => () => {
    //    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    //};

    //const handleSaveClick = (id: GridRowId) => () => {
    //    const rowValidationErrors = validationErrorsRef.current[id];
    //    if (rowValidationErrors == undefined) {
    //        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //    } else {
    //        const hasRowError = Object.values(rowValidationErrors).filter(hasError => hasError === true);
    //        if (hasRowError.length == 0) {
    //            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //        }
    //    }
    //};

    //const handleCancelClick = (id: GridRowId) => () => {
    //    setRowModesModel({
    //        ...rowModesModel,
    //        [id]: { mode: GridRowModes.View, ignoreModifications: true },
    //    });
    //    //@ts-ignore
    //    const editedRow = rows.find((row) => row.id === id);
    //    if (editedRow!.isNew) {
    //        setRows(rows.filter((row) => row.id !== id));
    //    }
    //}
    /*    renderHeader: () => (<strong>{'Pharmacist'}</strong>), width: 75, flex: 1}*/
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps,  'children' | 'severity'> | null>(null);

    //const columns: GridColDef[] = [
    //    {
    //        field: "wareHouseId", headerName: "WareHouse", editable: true, hideable: true, width: 200,
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value.length == 0;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                WarehouseId: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "address", headerName: "Address", editable: true, hideable: true, width: 200,
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value.length == 0;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                address: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "city", headerName: "City", editable: true, hideable: true, width: 100,
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value.length == 0;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                city: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "stateCode", headerName: "State", editable: true, hideable: true, width: 100, headerAlign: "center", align: "center", type: "singleSelect", valueOptions: [...stateKeys],
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value.length == 0;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                state: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "zip", headerName: "Zip Code", editable: true, hideable: true, width: 100, headerAlign: "center", align: "center",
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value.length != 5;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                zip: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "filledPerscriptions", headerName: "Prescriptions Filled", editable: true, hideable: true, width: 200, type: "number", headerAlign: "center", align: "center",
    //        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    //            const hasError = params.props.value < 0 || params.props.value == null;
    //            validationErrorsRef.current[params.id] = {
    //                ...validationErrorsRef.current[params.id],
    //                filledPerscriptions: hasError,
    //            };
    //            return { ...params.props, error: hasError };
    //        },
    //    },
    //    {
    //        field: "createdDateTest", headerName: "Created Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
    //        valueGetter: (params: IDelivery) => {
    //            return new Date(params.row.createdDate)
    //        }
    //    },
    //    {
    //        field: "updatedDate", headerName: "Updated Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
    //        valueGetter: (params: IDelivery) => {
    //            return params.row.updatedDate ? new Date(params.row.updatedDate) : null;
    //        }
    //    },
    //    {
    //        field: 'actions',
    //        type: 'actions',
    //        headerName: 'Actions',
    //        width: 100,
    //        cellClassName: 'actions',
    //        getActions: ({ id }) => {
    //            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    //            if (isInEditMode) {
    //                return [
    //                    <GridActionsCellItem
    //                        icon={<SaveIcon />}
    //                        label="Save"
    //                        sx={{
    //                            color: 'primary.main',
    //                        }}
    //                        onClick={handleSaveClick(id)}
    //                    />,
    //                    <GridActionsCellItem
    //                        icon={<CancelIcon />}
    //                        label="Cancel"
    //                        className="textPrimary"
    //                        onClick={handleCancelClick(id)}
    //                        color="inherit"
    //                    />,
    //                ];
    //            }
    //            return [
    //                <GridActionsCellItem
    //                    icon={<EditIcon />}
    //                    label="Edit"
    //                    className="textPrimary"
    //                    onClick={handleEditClick(id)}
    //                    color="inherit"
    //                />
    //            ];
    //        },
    //    },
    //]

    const columns: GridColDef[] = [
        { field: 'drugId', headerName: 'Drug Name', width: 120, type:'number' },
        { field: 'unitCount', headerName: 'Count', width: 60, type: 'number' },
        { field: 'unitPrice', headerName: 'Price', width: 80, type: 'number', valueFormatter: (params) => formatCurrency(params.value) },
        { field: 'totalPrice', headerName: 'Total', width: 100, type: 'number', valueFormatter: (params) => formatCurrency(params.value) },
        { field: 'deliveryDate', headerName: 'Delivery Date', width: 150, valueFormatter: (params) => formatDate(new Date(params.value)) }
    ];

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            //@ts-expect-error
            const returnedPharmacy = await dispatch(savePharmacy(newRow));
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return returnedPharmacy.payload;
        },
        //@ts-expect-error
        [dispatch(SaveDelivery)],
    );

    const handleProcessRowUpdateError = React.useCallback(() => {
        setSnackbar({ children: "Error saving the information. If the error persists, please call technical support.", severity: 'error' });
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    return (
        <div className="flex-col" >

            {deliveryError === 'loading' && (
                <div className="text-danger text-center">Error loading the page.</div>
            )}
            {deliveryStatus === 'loading' && <Loader></Loader>}
            {deliveryList.length > 0 && (
                <>
                    <DataGrid
                        rows={deliveryList}
                        columns={columns}
                        getRowId={(row) => row.pharmacyId}
                        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
                        paginationModel={paginationModel}
                        pageSizeOptions={[5, 10, 15]}
                        onPaginationModelChange={handlePaginationModelChange}
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

export default Delivery;