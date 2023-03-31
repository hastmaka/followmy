import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
// material
import {Box, MenuItem, Select, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
//
import Toolbar from "./ToolBar";
import {checkValidFields} from "../../helper/checkValidFields";
import EzText from "../../components/EzText/EzText";
import {generalSliceActions} from "../../store/adminSlice";
import {monthDays} from "../../helper";
import {CustomSelectCell} from "./CustomSelectCell";

const RootStyle = styled(Stack)(({theme}) => ({
    margin: '10px',
    height: 'calc(100vh - 80px)'
}));




export default function Main() {
    const {user} = useSelector(slice => slice.admin);
    const [rows, setRows] = useState([]);
    const daysToRender = useMemo(() => monthDays(user.tableData.id), [user.tableData.id])
    const addBtnRef = useRef();
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(_ => {
        if(user.tableData?.data?.length)
        setRows(user.tableData.data)
    }, [user.tableData.data])


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

    const handleCellDoubleClick = (params, event) => {
        event.preventDefault();
    }

    const allProductsVariantsGridColumns = useMemo(
        () => [
            {
                field: 'date',
                headerName: 'date',
                type: 'singleSelect',
                flex: 1,
                minWidth: 180,
                editable: true,
                align: 'center',
                headerAlign: 'center',
                renderEditCell: (params) => (
                    <CustomSelectCell
                        options={daysToRender}
                        value={params.value}
                        api={params.api}
                        id={params.id}
                    />
                ),
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
                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon sx={{fill: 'green'}}/>}
                                label="Save"
                                onClick={_ => handleSaveClick(params.id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon sx={{fill: 'red'}}/>}
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
                if(newRow.isNew) {
                    const {isNew, ...rest} = newRow;
                    window.dispatch(generalSliceActions.createNewRecordInUserTable({...rest}))
                    return rest
                } else {
                    window.dispatch(generalSliceActions.updateUserTable(newRow))
                    return newRow
                }
            }
        }, []
    );

    return (
        <RootStyle>
            <Box sx={{height: '100%', width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={allProductsVariantsGridColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20]}

                    editMode="row"
                    onCellDoubleClick={handleCellDoubleClick}

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
                            addBtnRef,
                            user
                        },
                    }}
                    //style
                    getRowClassName={(params) => {
                        // debugger
                    }}
                    sx={({palette}) => ({
                        color: palette['white'],
                        backgroundColor: palette['indigoDye']
                    })}
                />
            </Box>
        </RootStyle>
    )
}