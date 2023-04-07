// material
import {DataGrid} from "@mui/x-data-grid";
import {checkValidFields} from "../../helper/checkValidFields";
import {generalSliceActions} from "../../store/adminSlice";
import {useCallback} from "react";

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
    setOpen,
    GridContainerSx,
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
                    content: 'Row not saved, cells are empty'
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


    return (
        <DataGrid
            sx={tableSx}
            rows={rows}
            columns={columns}
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
