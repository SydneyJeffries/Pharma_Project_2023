/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryData, getDeliveryStatus, getDeliveryError, GetDeliveryList, SaveDelivery, DeleteDelivery } from '../slicers/DeliverySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridEventListener, GridRowEditStopReasons, GridRowModel, GridPreProcessEditCellProps, ValueOptions, GridToolbarContainer } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps, Button } from '@mui/material';
import UsePagination from "../UsePagination";
import IWarehouse from "../Interfaces/IWarehouse";
import useFetch from '../UseFetch';
import { fetchPharmacyList } from '../slicers/PharmacySlice';
import IPharmacy from '../Interfaces/IPharmacy';
import IDrug from '../Interfaces/IDrug';
import { handleEditClick, handleSaveClick, handleCancelClick } from '../GridUtilties';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Delivery = () => {

    const dispatch = useDispatch();
    const deliveryList = useSelector(getDeliveryData);
    const deliveryStatus = useSelector(getDeliveryStatus);
    const deliveryError = useSelector(getDeliveryError);
    const [rows, setRows] = React.useState(deliveryList);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const validationErrorsRef = React.useRef<{ [key: string]: { [key: string]: boolean } }>({});
    const { paginationModel, handlePaginationModelChange } = UsePagination({ page: 0, pageSize: 15 });
    const warehouseFetchUrl = '/Warehouse';
    const { data: drugData } = useFetch<IDrug[]>('/Lookup/GetDrugList');
    const { data: warehouseData } = useFetch<IWarehouse[]>(warehouseFetchUrl);
    const { data: pharmacyData } = useFetch<IPharmacy[]>('/Pharmacy');
    const [warehouseKeys, setWarehouseKeys] = React.useState<ValueOptions[]>([]);
    const [pharmacyKeys, setPharmacyKeys] = React.useState<ValueOptions[]>([]);
    const [drugKeys, setDrugKeys ] = React.useState<ValueOptions[]>([]);

    useEffect(() => {
        setRows(deliveryList);
    }, [deliveryList]);

    useEffect(() => {
        if (warehouseData) {
            const dropdownOptions = warehouseData?.map((warehouse) => ({
                value: warehouse.warehouseId,
                label: warehouse.name,
            }));
            setWarehouseKeys(dropdownOptions);
        }
    }, [warehouseData])

    useEffect(() => {
        if (drugData) {
            const dropdownOptions = drugData?.map((drug) => ({
                value: drug.drugId,
                label: drug.drugName,
            }));
            setDrugKeys(dropdownOptions);
        }
    }, [drugData])

    useEffect(() => {
        if (pharmacyData) {
            const dropdownOptionsPharma = pharmacyData?.map((pharmacy) => ({
                value: pharmacy.pharmacyId,
                label: pharmacy.name,
            }));
            setPharmacyKeys(dropdownOptionsPharma);
            console.log("pharmacyKeys", dropdownOptionsPharma)
        }
    }, [pharmacyData])



    useEffect(() => {
        dispatch(GetDeliveryList({ pageNumber: 0, pageSize: 10, pharmacyId: 0, warehouseId: 0 }));
        console.log(deliveryList);
    }, []);


    const handleEdit = handleEditClick(rowModesModel, setRowModesModel, GridRowModes);

    const handleSave = handleSaveClick(rowModesModel, setRowModesModel, validationErrorsRef);

    const handleCancel = handleCancelClick(rowModesModel, setRowModesModel, rows, setRows);


    const handleDeleteClick = (id: GridRowId) => () => {
        const rowToDelete = rows.filter((row: any) => row.id == id)[0]
        dispatch(DeleteDelivery(rowToDelete));
        setRows((prevRows: any) => prevRows.filter((row: any) => row.id !== id));
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    /*    renderHeader: () => (<strong>{'Pharmacist'}</strong>), width: 75, flex: 1}*/
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const columns: GridColDef[] = [
        {
            field: "wareHouseId", headerName: "Warehouse", editable: true, hideable: true, width: 170, type: "singleSelect", valueOptions: [...warehouseKeys],
            getOptionLabel: (value: any) => {
                return value?.label;
            },
            getOptionValue: (value: any) => {
                return value?.value;
            },
            valueGetter: (option) => {
                const value = option.row.warehouse.warehouseId;
                return value;
            },
            renderCell: (option) => (

                <span> {option.row.warehouse.name} </span>
            ),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    wareHouseId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "pharmacyId", headerName: "Pharmacy", editable: true, hideable: true, width: 170, type: "singleSelect", valueOptions: [...pharmacyKeys],
            getOptionLabel: (value: any) => {
                return value?.label;
            },
            getOptionValue: (value: any) => {

                return value?.value;
            },
            valueGetter: (option) => {
                const value = option.row.pharmacy.pharmacyId;
                return value;
            },
            renderCell: (option) => (
                <span> {option.row.pharmacy.name} </span>
            ),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    pharmacyId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "drugId", headerName: "Drug", editable: true, hideable: true, width: 130, type: "singleSelect", valueOptions: [...drugKeys],
            getOptionLabel: (value: any) => {
                debugger;
                return value?.label;
            },
            getOptionValue: (value: any) => {
                return value?.value;
            },
            valueGetter: (option) => {
                const value = option.row.drugId;
                return value;
            },
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value.length == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    drugId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "unitCount", headerName: "Unit Count", editable: true, hideable: true, width: 190, type: "number",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value <= 0 || params.props.value == null;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    unitCount: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "unitPrice", headerName: "Unit Price", editable: true, hideable: true, width: 190, headerAlign: "center", align: "center", type: "number", valueFormatter: (params) => formatCurrency(params.value),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value <= 0 || params.props.value == null;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    unitPrice: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "totalPrice", headerName: "Total Price", editable: false, hideable: true, width: 150, headerAlign: "center", align: "center", type: "number", valueFormatter: (params) => formatCurrency(params.value)

        },
        {
            field: "deliveryDate", headerName: "Delivery Date", editable: false, hideable: true, width: 170, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: any) => {
                return new Date(params.row.deliveryDate)
            },
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value == null;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    deliveryDate: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 130,
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
                            onClick={() => handleSave(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={() => handleCancel(id)}
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
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ]
    
    function EditToolbar(props: any) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {  
            const id = 70;
            setRows((oldRows: any) => [...oldRows, { id: 70, deliveryId: 70, warehouseId: 0, pharmacyId: 0, drugId: 0, unitCount: 0, unitPrice: 0, totalPrice: 0,  active: true,  isNew: true }]);
            setRowModesModel((oldModel : any) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'warehouseId' },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                  Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            //@ts-expect-error
            const returnedDelivery = await dispatch(SaveDelivery(newRow));
            setSnackbar({ children: 'Successfully saved', severity: 'success' });
            return returnedDelivery.payload;
        },
        //@ts-expect-error
        [dispatch(SaveDelivery)],
    );

    const handleProcessRowUpdateError = React.useCallback(() => {
        setSnackbar({ children: "Error saving the information. If the error persists, please call technical support.", severity: 'error' });
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    return (
        <div className="flex-col"  >

            {deliveryError === 'loading' && (
                <div className="text-danger text-center">Error loading the page.</div>
            )}
            {deliveryStatus === 'loading' && <Loader></Loader>}
            {deliveryList.length > 0 && (
                <>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.deliveryId}
                        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
                        paginationModel={paginationModel}
                        pageSizeOptions={[5, 10, 15]}
                        onPaginationModelChange={handlePaginationModelChange}
                        disableColumnMenu={false}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowEditStop={handleRowEditStop}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        slots={{
                            toolbar: EditToolbar,
                        }}
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