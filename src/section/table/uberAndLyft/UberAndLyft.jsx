import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
// material
import {Box, Stack, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
//
import UberAndLyftFooter from './UberAndLyftFooter';
import EzText from '../../../components/EzText/EzText';
import {monthDays} from '../../../helper';
import {CustomSelectCell} from '../CustomSelectCell';
import {tableSx} from '../../../helper/Style';
import EzMuiGrid from '../../../components/EzMuiGrid/EzMuiGrid';
import CustomToolBar from "../CustomToolBar";

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
    }, [user.tableData.id]);

    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}})
        setIsAddActive(false)
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}});

        const editedRow = rows.find(item => item.id === id);
        if (editedRow.isNew) {
            setRows(prev => prev.filter(item => item.id !== id))
        }
        setIsAddActive(false)
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
                                label='Save'
                                onClick={_ => handleSaveClick(params.id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon sx={{fill: 'red'}}/>}
                                label='Cancel'
                                className='textPrimary'
                                onClick={_ => handleCancelClick(params.id)}
                                color='inherit'
                            />,
                        ];
                    }
                    return [
                        <Tooltip title='Edit'>
                            <GridActionsCellItem
                                icon={<EditIcon sx={{fill: 'white'}}/>}
                                label='Edit'
                                disabled={isInEditMode === true}
                                onClick={_ => handleEditClick(params.id)}
                                // showInMenu
                            />
                        </Tooltip>
                    ]
                },
            }
        ], [rowModesModel, handleSaveClick, handleCancelClick, handleEditClick])

    return (
        <RootStyle>
            <Box sx={{height: '100%', width: '100%'}}>
                <EzMuiGrid
                    user={user}
                    rows={rows}
                    columns={allProductsVariantsGridColumns}
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
                            columns: allProductsVariantsGridColumns
                        },
                    }}
                    disableSelectionOnClick
                    sx={({palette}) => tableSx(palette)}
                />
            </Box>
        </RootStyle>
    )
}