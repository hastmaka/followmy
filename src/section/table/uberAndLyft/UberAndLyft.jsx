import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
// material
import {Box, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
//
import UberAndLyftFooter from './UberAndLyftFooter';
import EzText from '../../../components/EzText/EzText';
import {monthDays} from '../../../helper';
import {tableSx} from '../../../helper/Style';
import EzMuiGrid from '../../../components/EzMuiGrid/EzMuiGrid';
import CustomToolBar from "../CustomToolBar";
import {CustomSelectCell} from "../CustomSelectCell";

//-----------------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    margin: '10px',
    height: 'calc(100vh - 80px)'
}));

//-----------------------------------------------------------------------
export default function UberAndLyft() {
    const {user} = useSelector(slice => slice.admin);
    const [rows, setRows] = useState([]);
    const daysToRender = useMemo(() => monthDays(user.tableData.id), [user.tableData.id])
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAddActive, setIsAddActive] = useState(false);

    useEffect(_ => {
        setRows(user.tableData.data)
    }, [user.tableData.id, user.tableData.data]);

    const columns = [
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
                    daysAlreadyAdded={user.tableData.data.map(item => item.date)}
                    isNew={params.row.isNew}
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
                return <EzText text={`${params.row.miles} / $${(params.row.miles * 0.08).toFixed(2)}`}/>
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
        }
    ]

    return (
        <RootStyle>
            <Box sx={{height: '100%', width: '100%'}}>
                <EzMuiGrid
                    user={user}
                    rows={rows}
                    setRows={setRows}
                    columns={columns}
                    daysToRender={daysToRender}
                    setIsAddActive={setIsAddActive}
                    isAddActive={isAddActive}
                    setRowModesModel={setRowModesModel}
                    rowModesModel={rowModesModel}
                    components={{
                        Toolbar: CustomToolBar,
                        Footer: UberAndLyftFooter
                    }}
                    componentsProps={{
                        toolbar: {
                            setRows,
                            isAddActive,
                            setIsAddActive,
                            setRowModesModel,
                            user,
                            columns
                        },
                    }}
                    disableSelectionOnClick
                    sx={({palette}) => tableSx(palette)}
                />
            </Box>
        </RootStyle>
    )
}