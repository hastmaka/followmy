// material
import { Stack, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useRef, useCallback } from "react";
import Toolbar from "./ToolBar";

const RootStyle = styled(Stack)(({ theme }) => ({
  margin: '10px',
  height: 'calc(100vh - 80px)'
}));

const columns = [
  { field: 'id', headerName: 'id', width: 90 },
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
    field: 'miles',
    headerName: 'miles',
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
    field: 'dolarsPerHour',
    headerName: '$/hr',
    type: 'number',
    flex: 1,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  }
];

const temRrows = [
  { id: 1, date: 'test', uber: 50, lyft: 100, miles: 85, gas: 90, expenses: 14, dolarsPerHour: 33 },
];

export default function Main() {
  const [rows, setRows] = useState([...temRrows]);
    const addBtnRef = useRef();
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdateError = useCallback((error) => {
      window.displayNotification({type: error.type, content: error.content})
      console.log(error)
  }, []);

    const processRowUpdate = useCallback(
      async (newRow, oldRow) => {
          await new Promise((resolve, reject) => {
              //check empty field
              if(Object.values(newRow).every(x => x !== null || x !== '' || x > 0)) {
                  return reject({type: 'error', content: 'No empty field allowed'});
              }
              resolve()
          })
          if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
              return oldRow
          } else {
              //updateProductApi(newRow.id, newRow)
              return newRow
          }
      },[]
  );
  //how many hour
  //how much u earn
  //fuel
  //other expenses
  //day - weekly - monthly
  return (
    <RootStyle>
      <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onRowModesModelChange={model => setRowModesModel(model)}
        rowModesModel={rowModesModel}
        components={{
          Toolbar: Toolbar
        }}
        componentsProps={{
          toolbar: {
              // rowMode,
              // selectedRowParams
              setRows,
              rowModesModel,
              setRowModesModel,
              from: 'product'
          },
      }}
      />
    </Box>
    </RootStyle>
  )
}