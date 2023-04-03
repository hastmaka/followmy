// material
import {DataGrid} from "@mui/x-data-grid";

//----------------------------------------------------------------
const tableSx = {
    borderRadius: '24px',
    border: '1px solid lightgrey'
};

//----------------------------------------------------------------

export default function EzMuiGrid({
    rows,
    columns,
    setOpen,
    GridContainerSx,
    rowModesModel,
    setRowModesModel,
    processRowUpdate,
    handleProcessRowUpdateError,
    ...rest
}) {
    const handleRowEditStart = (params, event) => event.defaultMuiPrevented = true;
    const handleRowEditStop = (params, event) => event.defaultMuiPrevented = true;


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
