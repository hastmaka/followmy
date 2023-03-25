// material
import {Box, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Toolbar from "./ToolBar";
import {checkValidFields} from "../../helper/checkValidFields";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import EzText from "../../components/EzText/EzText";
import {useLocation} from "react-router-dom";
import {generalSliceActions} from "../../store/adminSlice";

const RootStyle = styled(Stack)(({theme}) => ({
    margin: '10px',
    height: 'calc(100vh - 80px)'
}));

const tempRows = [
    {
        id: 1,
        date: new Date('3/21/2023'),
        uber: 50,
        lyft: 246,
        other: 100,
        miles: 124,
        hours: 6,
        gas: 0,
        expenses: 14,
        dollarsPerHour: 33
    },
    {
        id: 3,
        date: new Date('3/23/2023'),
        uber: 50,
        lyft: 246,
        other: 100,
        miles: 124,
        hours: 6,
        gas: 0,
        expenses: 14,
        dollarsPerHour: 33
    },
    {
        id: 2,
        date: new Date('3/22/2023'),
        uber: 50,
        lyft: 246,
        other: 100,
        miles: 124,
        hours: 6,
        gas: 0,
        expenses: 14,
        dollarsPerHour: 33
    },
];

export default function Main() {
    const location = useLocation();
    useEffect(_ => {
        if(!!location.state)
        window.dispatch(generalSliceActions.setUser(location.state))
    }, [location.state])

    const [rows, setRows] = useState([...tempRows]);
    const addBtnRef = useRef();
    const [rowModesModel, setRowModesModel] = useState({});

    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}})
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}});

        const editedRow = rows.find(item => item.id === id);
        if (editedRow.isNew) {
            setRows(prev => prev.filter(item => item.id !== id))
        }
    }, [rowModesModel]);

    const allProductsVariantsGridColumns = useMemo(
        () => [
            {
                field: 'date',
                headerName: 'date',
                type: 'date',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'uber',
                headerName: 'uber',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'lyft',
                headerName: 'lyft',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'other',
                headerName: 'other',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'hours',
                headerName: 'hours',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'gas',
                headerName: 'gas',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'expenses',
                headerName: 'expenses',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'miles',
                headerName: 'miles',
                type: 'number',
                flex: 1,
                editable: true,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    return <EzText text={`${params.row.miles} / $${params.row.miles * 0.08}`}/>
                }
            },
            {
                field: 'dollarsPerHour',
                headerName: '$/hr',
                type: 'number',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    const {uber, lyft, other, hours, miles, gas, expenses} = params.row;
                    const real = (uber + lyft + other - gas - expenses - miles * 0.08) / hours
                    return <EzText text={`${real.toFixed(2)} / hr`}/>
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                align: 'center',
                type: 'actions',
                sortable: false,
                getActions: (params) => {
                    const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                    // debugger
                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon/>}
                                label="Save"
                                onClick={_ => handleSaveClick(params.id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon/>}
                                label="Cancel"
                                className="textPrimary"
                                onClick={_ => handleCancelClick(params.id)}
                                color="inherit"
                            />,
                        ];
                    }
                    return [
                        <Tooltip title="Edit">
                            <GridActionsCellItem
                                icon={<EditIcon/>}
                                label="Edit"
                                disabled={isInEditMode === true}
                                onClick={_ => handleEditClick(params.id)}
                                // showInMenu
                            />
                        </Tooltip>
                    ]
                },
            }
        ], [rowModesModel, handleSaveClick, handleCancelClick, handleEditClick])

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: error.type, content: error.content})
        console.log(error)
    }, []);

    const processRowUpdate = useCallback(
        async (newRow, oldRow) => {
            await new Promise((resolve, reject) => {
                //check empty field
                // const today = new Date();
                // const newDate = new Date(newRow.date)
                // if (newDate <= today) {
                //     return reject({type: 'error', content: 'Date has to be greater than today'});
                // }
                const value = checkValidFields(newRow)
                if (value !== true) {
                    return reject({type: 'error', content: `${value.key} can't be ${value.value}`});
                }
                resolve()
            })
            if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                //updateProductApi(newRow.id, newRow)
                return newRow
            }
        }, []
    );
    //how many hour
    //how much u earn
    //fuel
    //other expenses
    //day - weekly - monthly
    return (
        <RootStyle>
            <Box sx={{height: '100%', width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={allProductsVariantsGridColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20]}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    onRowModesModelChange={model => setRowModesModel(model)}
                    rowModesModel={rowModesModel}
                    components={{
                        Toolbar: Toolbar
                    }}
                    componentsProps={{
                        toolbar: {
                            setRows,
                            rowModesModel,
                            setRowModesModel,
                            addBtnRef
                        },
                    }}
                />
            </Box>
        </RootStyle>
    )
}