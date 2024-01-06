/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyData, getPharmacyStatus, getPharmacyError, fetchPharmacyList, savePharmacy, getPharmacySingleData, getPharmacy, updatePharmacy } from '../slicers/PharmacySlice';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowModesModel, GridRowModes, GridRowModel, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertProps } from '@mui/material';
import useFetch from '../UseFetch';
import IState from '../Interfaces/IState';
import { handleEditClick, handleSaveClick, handleCancelClick, handleRowEditStop } from '../GridUtilties';
import { Link } from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PharmacistModel from '../components/PharmacistModel';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


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
    const selectedPharmacy = useSelector(getPharmacySingleData);
    const [isPharmacySelected, setIsPharmacySelected] = React.useState<boolean>(false);

    // set rows on grid
    useEffect(() => {
        setRows(pharmacyList);
    }, [pharmacyList]);

    // set drop down list for states
    useEffect(() => {
        if (statesData) {
            const stateCodes = statesData.map(item => item.stateCode);
            setStateKeys([...stateCodes]);
        }
    }, [statesData]);

    // get grid rows data
    useEffect(() => {
        dispatch(fetchPharmacyList());
    }, []);

    // remove active class from delivery tab
    useEffect(() => {
        const deliveryNavElement = document.getElementById("deliveryNav");
        if (deliveryNavElement) {
            deliveryNavElement.classList.remove("active-link");
        }
    }, [])

    function onClickView(pharmacyId: number) {
        dispatch(getPharmacy(pharmacyId));
        setIsPharmacySelected(true)
    }

    const handleEdit = handleEditClick(rowModesModel, setRowModesModel, GridRowModes);

    const handleSave = handleSaveClick(rowModesModel, setRowModesModel, validationErrorsRef);

    const handleCancel = handleCancelClick(rowModesModel, setRowModesModel, rows, setRows);

    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const columns: GridColDef[] = [
        {
            field: "name", headerName: "Name", editable: true, hideable: true, width: 220,
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
            field: "city", headerName: "City", editable: true, hideable: true, width: 120,
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
            field: "stateCode", headerName: "State", editable: true, hideable: true, width: 110, headerAlign: "center", align: "center", type: "singleSelect", valueOptions: [...stateKeys],
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
            field: "filledPerscriptions", headerName: "Prescriptions Filled", editable: true, hideable: true, width: 170, type: "number", headerAlign: "center", align: "center",
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
            field: "createdDateTest", headerName: "Created Date", editable: false, hideable: true, width: 130, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: any) => {
                return new Date(params.row.createdDate)
            }
        },
        {
            field: "updatedDate", headerName: "Updated Date", editable: false, hideable: true, width: 140, type: "date", headerAlign: "center", align: "center",
            valueGetter: (params: any) => {
                return params.row.updatedDate ? new Date(params.row.updatedDate) : null;
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            headerAlign: "center",
            align: "right",
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
                    <>
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={() => handleEdit(id)}
                            color="inherit"
                        />
                        <Link to={`/delivey/${id}`} className="text-black" >
                            <LocalShippingIcon />
                        </Link>
                        &nbsp; <span className="underline link  text-black" onClick={() => onClickView(id)}> <SupervisorAccountIcon/> </span>
                    </>
                ];
            },
        },
    ]

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            //@ts-expect-error
            const returnedPharmacy = await dispatch(savePharmacy(newRow));
            setSnackbar({ children: 'Successfully saved', severity: 'success' });
     
            dispatch(updatePharmacy({ id: returnedPharmacy.payload.id, newData: returnedPharmacy.payload }));
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
        <>
            <div className="container-xxl ">
                {selectedPharmacy != null && isPharmacySelected == true && <PharmacistModel> </PharmacistModel>}
                <div className="flex-col " >
                    {pharmacyError === 'loading' && (
                        <div className="text-danger text-center">Error loading the page.</div>
                    )}
                    {pharmacyStatus === 'loading' && <Loader></Loader>}

                    {pharmacyList.length > 0 && (
                        <div id="pharmacies" >

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
                                onRowEditStop={(params, event, details) => handleRowEditStop(params, event, details)}
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

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;