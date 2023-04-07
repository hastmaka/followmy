import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
// material
import {Box, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import {GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
//
import EzMuiGrid from "../../../components/EzMuiGrid/EzMuiGrid";
import {monthDays} from "../../../helper";
import {CustomSelectCell} from "../CustomSelectCell";
import PersonalFooter from "./PersonalFooter";
import {tableSx} from "../../../helper/Style";
import CustomToolBar from "../CustomToolBar";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    margin: '10px',
    height: 'calc(100vh - 80px)'
}));

//----------------------------------------------------------------

export default function Personal() {
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
                field: 'deposit',
                headerName: 'deposit',
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
                        Footer: PersonalFooter
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
                    sx={({palette}) => tableSx(palette)}
                />
            </Box>
        </RootStyle>
    );
};