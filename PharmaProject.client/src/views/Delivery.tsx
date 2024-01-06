/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryData, getDeliveryStatus, getDeliveryError, GetDeliveryList, SaveDelivery, DeleteDelivery, getTotalRowsForPagination } from '../slicers/DeliverySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes,  GridRowModel, GridPreProcessEditCellProps, ValueOptions, GridToolbarContainer, GridValueSetterParams } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps, Button } from '@mui/material';
import IWarehouse from "../Interfaces/IWarehouse";
import useFetch from '../UseFetch';
import IPharmacy from '../Interfaces/IPharmacy';
import IDrug from '../Interfaces/IDrug';
import { handleEditClick, handleSaveClick, handleCancelClick, handleAddNewRecordClick, handleRowEditStop } from '../GridUtilties';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import OptionsDropDownList from '../components/OptionsDropDownList';
import { useParams } from 'react-router-dom'
import IDelivery from '../Interfaces/IDelivery';

const Delivery = () => {

    const { pharmacyId } = useParams();
    const dispatch = useDispatch();
    const deliveryList = useSelector(getDeliveryData);
    const deliveryStatus = useSelector(getDeliveryStatus);
    const deliveryError = useSelector(getDeliveryError);
    const [rows, setRows] = React.useState(deliveryList);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const validationErrorsRef = React.useRef<{ [key: string]: { [key: string]: boolean } }>({});
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 8 });
    const warehouseFetchUrl = '/Warehouse';
    const { data: drugData } = useFetch<IDrug[]>('/Lookup/GetDrugList');
    const { data: warehouseData } = useFetch<IWarehouse[]>(warehouseFetchUrl);
    const { data: pharmacyData } = useFetch<IPharmacy[]>('/Pharmacy');
    const [warehouseKeys, setWarehouseKeys] = React.useState<ValueOptions[]>([]);
    const [pharmacyKeys, setPharmacyKeys] = React.useState<ValueOptions[]>([]);
    const [drugKeys, setDrugKeys] = React.useState<ValueOptions[]>([]);
    const [selectedPharma, setSlectedPharmal] = React.useState<number>(pharmacyId);
    const [selectedWarehouse, setSelectedWarehouse] = React.useState<number>(0);
    const totalRowsForPagination = useSelector(getTotalRowsForPagination);
    const [deleteDisabled, setDeleteDisabled] = React.useState<boolean>(false);
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    // set rows on grid
    useEffect(() => {
        setRows([...deliveryList]);
    }, [deliveryList]);

    //create drop downs 
    useEffect(() => {
        if (warehouseData) {
            setWarehouseKeys(generateDropdownOptions(warehouseData, 'warehouseId', 'name'));
        }

        if (drugData) {
            setDrugKeys(generateDropdownOptions(drugData, 'drugId', 'drugName'));
        }

        if (pharmacyData) {
            setPharmacyKeys(generateDropdownOptions(pharmacyData, 'pharmacyId', 'name'));
        }
    }, [warehouseData, drugData, pharmacyData]);

    const generateDropdownOptions = (data: any[], valueKey: string, labelKey: string): ValueOptions[] => {
        return data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));
    };

    useEffect(() => {
        // navbar active class doesn't update when you use parameters
        const deliveryNavElement = document.getElementById("deliveryNav");
        if (deliveryNavElement) {
            deliveryNavElement.classList.add("active-link");
        }
    }, [])

    const getDeliveryList = () => {
        dispatch(GetDeliveryList({ pageNumber: paginationModel.page, pageSize: paginationModel.pageSize, pharmacyId: selectedPharma, warehouseId: selectedWarehouse }));
    }

    // Get grid rows data
    useEffect(() => {
        getDeliveryList()
        console.log(deliveryList);

    }, [selectedPharma, selectedWarehouse, paginationModel]);

    const handleEdit = handleEditClick(rowModesModel, setRowModesModel, GridRowModes);

    const handleSave = handleSaveClick(rowModesModel, setRowModesModel, validationErrorsRef);

    const handleCancel = handleCancelClick(rowModesModel, setRowModesModel, rows, setRows, setDeleteDisabled);

    const handleDelete = (id: GridRowId) => () => {
        const rowToDelete = rows.filter((row: any) => row.id == id)[0]
        dispatch(DeleteDelivery(rowToDelete));
        setSnackbar({ children: 'Successfully deleted', severity: 'success' });
        getDeliveryList();
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    const columns: GridColDef[] = [
        {
            field: "wareHouseId", headerName: "Warehouse", editable: true, width: 200, type: "singleSelect", valueOptions: [...warehouseKeys], sortable: false, filterable: false,
            getOptionLabel: (value: any) => {
                return value?.label;
            },
            getOptionValue: (value: any) => {
                return value?.value;
            },
            valueGetter: (option) => {
                const value = option.row.warehouseId;
                return value;
            },
            renderCell: (option) => {
                return option.row.warehouseName ? option.row.warehouseName : warehouseKeys.find(x => x.value == option.row.warehouseId)?.label;
            },
            valueSetter: (params: GridValueSetterParams) => {
                return { ...params.row, warehouseId: params.value };
            },
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    warehouseId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "pharmacyId", headerName: "Pharmacy", editable: true, width: 220, type: "singleSelect", valueOptions: [...pharmacyKeys], filterable: false, sortable: false,
            getOptionLabel: (value: any) => {
                return value?.label;
            },
            getOptionValue: (value: any) => {
                return value?.value;
            },
            valueSetter: (params) => {
                return { ...params.row, pharmacyId: params.value };
            },
            valueGetter: (option) => {
                const value = option.row.pharmacyId;
                return value;
            },
            renderCell: (option) => {
                return option.row.pharmacyName ? option.row.PharmacyName : pharmacyKeys.find(x => x.value == option.row.pharmacyId)?.label;
            },
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    pharmacyId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "drugId", headerName: "Drug", editable: true, width: 130, type: "singleSelect", valueOptions: [...drugKeys], sortable: false, filterable: false,
            getOptionLabel: (value: any) => {
                return value?.label;
            },
            getOptionValue: (value: any) => {
                return value?.value;
            },
            valueGetter: (option) => {
                const value = option.row.drugId;
                return value;
            },
            valueSetter: (params) => {
                return { ...params.row, drugId: params.value };
            },
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value == 0;
                validationErrorsRef.current[params.id] = {
                    ...validationErrorsRef.current[params.id],
                    drugId: hasError,
                };
                return { ...params.props, error: hasError };
            },
        },
        {
            field: "unitCount", headerName: "Unit Count", editable: true, width: 120, type: "number", sortable: false, filterable: false, headerAlign: "center", align: "center",
            valueSetter: (params) => {
                return { ...params.row, unitCount: params.value };
            },
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
            field: "unitPrice", headerName: "Unit Price", editable: true, width: 190, headerAlign: "center", align: "center", type: "number", sortable: false, filterable: false,
            valueFormatter: (params) => formatCurrency(params.value),
            valueSetter: (params) => {
                return { ...params.row, unitPrice: params.value };
            },
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
            field: "totalPrice", headerName: "Total Price", editable: false, width: 150, headerAlign: "center", align: "center", type: "number", valueFormatter: (params) => formatCurrency(params.value), sortable: false, filterable: false,
        },
        {
            field: "deliveryDate", headerName: "Delivery Date", editable: true, width: 170, type: "date", headerAlign: "center", align: "center", sortable: false, filterable: false,
            valueGetter: (params: any) => {
                return new Date(params.row.deliveryDate)
            },
            valueSetter: (params) => {
                return { ...params.row, deliveryDate: params.value };
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
            width: 140,
            cellClassName: 'actions',
            align: "right",
            headerAlign: "right",
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
                        disabled={deleteDisabled}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDelete(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ]

    const EditToolbar = () => {
        /*        const { setRows, setRowModesModel } = props;*/
        const newRow: IDelivery = { deliveryId: 0, warehouseId: 0, pharmacyId: 0, drugId: 0, unitCount: 0, unitPrice: 0, totalPrice: 0, deliveryDate: new Date(), active: true, id: 0, updatedDate: null, createdDate: new Date().toISOString(), createdBy: "", updatededBy: null, pharmacy: {}, warehouse: {}, isNew: true }
        const handleAddNewRecord = handleAddNewRecordClick(rowModesModel, rows, setRows, setRowModesModel, 'warehouseId', setDeleteDisabled);

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={() => handleAddNewRecord(newRow)}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }


    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {

            //@ts-expect-error
            const returnedDelivery: any = await dispatch(SaveDelivery(newRow));
            setSnackbar({ children: 'Successfully saved', severity: 'success' });
            if (newRow.isNew) {
                setRows((prevRows: any) => prevRows.map((row: any) => row.id == 0 ? { ...returnedDelivery.payload } : row));
                getDeliveryList();
            }
            setDeleteDisabled(false)
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
        <div className="container-xxl  ">
            <div className="flex-col"  >
                {deliveryError === 'loading' && (
                    <div className="text-danger text-center">Error loading the page.</div>
                )}
                {deliveryStatus === 'loading' && <Loader></Loader>}
                {deliveryList.length > 0 && (
                    <div id="deliveries">
                        <div className="row mb-2">
                            <div className="col-md-3 col-6">
                                <OptionsDropDownList valueKeys={pharmacyKeys} setValue={setSlectedPharmal} title={"Pharmacy"} selectedValue={selectedPharma} />
                            </div>
                            <div className="col-md-3 col-6">
                                <OptionsDropDownList valueKeys={warehouseKeys} setValue={setSelectedWarehouse} title={"Warehouse"} selectedValue={selectedWarehouse} />
                            </div>
                        </div>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.deliveryId}
                            processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            disableColumnMenu={true}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowEditStop={(params, event, details) => handleRowEditStop(params, event, details)}
                            paginationMode="server"
                            rowCount={totalRowsForPagination}
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Delivery;