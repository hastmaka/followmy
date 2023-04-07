// material
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import {checkValidFields} from "../../helper/checkValidFields";
import {generalSliceActions} from "../../store/adminSlice";
import {useCallback, useMemo} from "react";
import {CustomSelectCell} from "../../section/table/CustomSelectCell";
import EzText from "../EzText/EzText";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

//----------------------------------------------------------------
const tableSx = {
    borderRadius: '4px',
    border: '1px solid lightgrey'
};

//----------------------------------------------------------------

export default function EzMuiGrid({
    user,
    rows,
    columns,
    rowModesModel,
    setRowModesModel,
    ...rest
}) {
    const handleRowEditStart = (params, event) => event.defaultMuiPrevented = true;
    const handleRowEditStop = (params, event) => event.defaultMuiPrevented = true;

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: error.type, content: error.content})
        console.log(error)
    }, []);

    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}})
        rest.setIsAddActive(false)
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}});

        const editedRow = rows.find(item => item.id === id);
        if (editedRow.isNew) {
            rest.setRows(prev => prev.filter(item => item.id !== id))
        }
        rest.setIsAddActive(false)
    }, [rowModesModel]);

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
                window.displayNotification({
                    type: 'warning',
                    content: 'Row not saved, cells are empty or no data was changed'
                })
                return oldRow
            } else {
                if(newRow.isNew) {
                    const {isNew, ...rest} = newRow;
                    window.dispatch(generalSliceActions.createNewRecordInUserTable({
                        newR: {...rest},
                        collection: user.select
                    }))
                    window.displayNotification({
                        type: 'success',
                        content: 'Row saved successfully!!'
                    })
                    return rest
                } else {
                    window.dispatch(generalSliceActions.updateUserTable({
                        newRow,
                        collection: user.select
                    }))
                    window.displayNotification({
                        type: 'success',
                        content: 'Row edited successfully!!'
                    })
                    return newRow
                }
            }
        }, []
    );

    const allProductsVariantsGridColumns = useMemo(
        () => [
            ...columns,
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
                                label='Save'
                                onClick={_ => {
                                    rest.setIsAddActive(false);
                                    handleSaveClick(params.id)
                                }}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon sx={{fill: 'red'}}/>}
                                label='Cancel'
                                className='textPrimary'
                                onClick={_ => {
                                    rest.setIsAddActive(false);
                                    handleCancelClick(params.id)
                                }}
                                color='inherit'
                            />,
                        ];
                    }
                    return [
                        <Tooltip title='Edit'>
                            <GridActionsCellItem
                                icon={<EditIcon sx={{fill: 'white'}}/>}
                                label='Edit'
                                disabled={isInEditMode === true || rest.isAddActive}
                                onClick={_ => {
                                    rest.setIsAddActive(true);
                                    handleEditClick(params.id)
                                }}
                            />
                        </Tooltip>
                    ]
                },
            }
        ], [rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, rest.isAddActive])


    return (
        <DataGrid
            sx={tableSx}
            rows={rows}
            columns={allProductsVariantsGridColumns}
            getRowId={row => row.id}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            //to edit function in v5 editMode and experimentalFeatures are required
            editMode='row'
            onRowEditStart={handleRowEditStart}//disable edit with dbclick
            onRowEditStop={handleRowEditStop}//disable edit with dbclick
            experimentalFeatures={{newEditingApi: true}}
            onRowModesModelChange={model => setRowModesModel(model)}
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            {...rest}
        />
    );
}


EzMuiGrid.prototype = {
    user: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowModesModel: PropTypes.object.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
    rest: PropTypes.object
}