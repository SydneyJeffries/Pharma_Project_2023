/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryData, getDeliveryStatus, getDeliveryError, GetDeliveryList, SaveDelivery, DeleteDelivery, getTotalRowsForPagination } from '../../slicers/DeliverySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModesModel, GridRowModes, GridRowModel, GridPreProcessEditCellProps, ValueOptions, GridToolbarContainer, GridValueSetterParams, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps, Button, TextField } from '@mui/material';
import IWarehouse from "../../Interfaces/IWarehouse";
import useFetch from '../../customHooks/UseFetch';
import IPharmacy from '../../Interfaces/IPharmacy';
import IDrug from '../../Interfaces/IDrug';
import { handleEditClick, handleSaveClick, handleCancelClick, handleAddNewRecordClick, handleRowEditStop, handleProcessRowUpdateError } from '../../GridUtilties';
import OptionsDropDownList from '../../components/optionsDropDownList/OptionsDropDownList';
import { useParams } from 'react-router-dom'
import IDelivery from '../../Interfaces/IDelivery';
import { Save, Close, Edit, Delete, Add } from '@mui/icons-material';
import './Delivery.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const Delivery = () => {
    const { pharmacyId } = useParams<{ pharmacyId: string }>();
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
    const [selectedPharma, setSlectedPharmal] = React.useState<number>(Number(pharmacyId));
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
            valueGetter: (option: GridValueSetterParams) => {
                const value = option.row.warehouseId;
                return value;
            },
            renderCell: (option: GridRenderCellParams) => {
                return option.row.warehouseName;
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
            valueSetter: (params: GridValueSetterParams) => {
                return { ...params.row, pharmacyId: params.value };
            },
            valueGetter: (option: GridValueGetterParams) => {
                const value = option.row.pharmacyId;
                return value;
            },
            renderCell: (option: GridRenderCellParams) => {
                return option.row.pharmacyName;
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
            valueGetter: (option: GridValueGetterParams) => {
                const value = option.row.drugId;
                return value;
            },
            valueSetter: (params: GridValueSetterParams) => {
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
            valueSetter: (params: GridValueSetterParams) => {
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
            valueSetter: (params: GridValueSetterParams) => {
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
            field: "totalPrice", headerName: "Total Price", editable: false, width: 147, headerAlign: "center", align: "center", type: "number", valueFormatter: (params) => formatCurrency(params.value), sortable: false, filterable: false,
        },
        {
            field: "deliveryDate", headerName: "Delivery Date", editable: true, width: 190, type: "date", headerAlign: "center", align: "center", sortable: false, filterable: false,
            renderEditCell: (params: GridRenderCellParams) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={dayjs(params.row.deliveryDate)} onChange={(newValue) => {
                            setRows((prevRows: any) => prevRows.map((row: any) => row.id == params.row.id ? { ...row, deliverydate: newValue.$d } : row));
                        }} />
                    </LocalizationProvider>
                );
            },
            valueGetter: (params: GridValueGetterParams) => {
                return new Date(params.row.deliveryDate)
            },
            valueSetter: (params: GridValueSetterParams) => {
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
            width: 125,
            cellClassName: 'actions',
            align: "right",
            headerAlign: "right",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<Save />} label="Save" sx={{ color: 'primary.main' }} onClick={() => handleSaveClick(id, rowModesModel, setRowModesModel, validationErrorsRef)} />,

                        <GridActionsCellItem icon={<Close />} label="Cancel" className="textPrimary" onClick={() => handleCancelClick(id, rowModesModel, setRowModesModel, rows, setRows, setDeleteDisabled)} color="inherit" />,
                    ];
                }
                return [
                    <GridActionsCellItem icon={<Edit />} label="Edit" className="textPrimary" onClick={() => handleEditClick(id, rowModesModel, setRowModesModel, GridRowModes)} color="inherit" />,

                    <GridActionsCellItem disabled={deleteDisabled} icon={<Delete />} label="Delete" onClick={handleDelete(id)} color="inherit" />
                ];
            },
        },
    ]

    const EditToolbar = () => {
        const newRow: IDelivery = { deliveryId: 0, warehouseId: 0, pharmacyId: 0, drugId: 0, unitCount: 0, unitPrice: 0, totalPrice: 0, deliveryDate: new Date(), active: true, Id: 0, updatedDate: null, createdDate: new Date(), createdBy: "", updatedBy: null, isNew: true }
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<Add />} onClick={() => handleAddNewRecordClick(rowModesModel, rows, setRows, setRowModesModel, 'warehouseId', setDeleteDisabled, newRow)}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    const processRowUpdate = React.useCallback(
        async (savedRow: GridRowModel) => {

            //@ts-expect-error
            debugger;
            const returnedDelivery: any = await dispatch(SaveDelivery(savedRow));
            setSnackbar({ children: 'Successfully saved', severity: 'success' });
            if (savedRow.isNew) {
                setRows((prevRows: any) => prevRows.map((row: any) => row.id == 0 ? { ...returnedDelivery.payload } : row));
            }
            getDeliveryList();
            setDeleteDisabled(false)
            return returnedDelivery.payload;

        },
        //@ts-expect-error
        [dispatch(SaveDelivery)],
    );

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
                            onProcessRowUpdateError={handleProcessRowUpdateError(setSnackbar)}
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
                                onClose={() => setSnackbar(null)}
                                autoHideDuration={6000}  >
                                <Alert {...snackbar}
                                    onClose={() => setSnackbar(null)} />
                            </Snackbar>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Delivery;