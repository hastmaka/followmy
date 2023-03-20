// material
import { Stack, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
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

const rows = [
  { id: 1, date: 'test', uber: 50, lyft: 100, miles: 85, gas: 90, expenses: 14, dolarsPerHour: 33 },
];

export default function Main() {
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: Toolbar
      }}
      />
    </Box>
    </RootStyle>
  )
}