import {useSelector} from "react-redux";
// material
import {IconButton, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {GridRowModes} from "@mui/x-data-grid";
//
import EzText from "../../../components/EzText/EzText";
import {createId, getActualMonthAndYear} from "../../../helper";
import EzCustomSelect from "../../../components/EzCustomSelect/EzCustomSelect";
import {getUserTableData} from "../../../helper/firebase/FirestoreApi";
import {useState} from "react";

const RootStyle = styled(Stack)(({theme}) => ({
    height: '60px',
    border: '1px solid #e2e2e2',
    backgroundColor: '#669bbc',
    borderRadius: '4px 4px 0 0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 10px',
    justifyContent: 'space-between'
}));

export default function Toolbar({setRows, isAdd, setIsAdd, setRowModesModel, user}) {
    const {month} = useSelector(slice => slice.admin)
    const [value, setValue] = useState(getActualMonthAndYear())
    const handleAddRow = async () => {
        setIsAdd(true)
        const id = createId(20);
        setRows(prev => {
            return [...prev, {
                id,
                // date: !user.tableData?.data?.length ?
                //     new Date().toLocaleDateString().split('/')[1].toString().padStart(2, '0') :
                //     (Math.max(...user.tableData.data.map(item => item.date)) + 1).toString().padStart(2, '0'),
                date: '',
                uber: 0,
                lyft: 0,
                other: 0,
                hours: 0,
                miles: 0,
                gas: 0,
                expenses: 0,
                isNew: true
            }]
        });
        setRowModesModel(prev => {
            return {
                ...prev,
                [id]: {mode: GridRowModes.Edit, fieldToFocus: 'date'}
            }
        })
    }
    return (
        <RootStyle>
            <EzText
                text={user.select === 'uber_and_lyft' ? 'Uber and Lyft' : 'Personal'}
                sx={{color: 'white'}}
            />

            <Stack direction='row' gap='10px' alignItems='center'>
                <Stack direction='row' gap='10px' alignItems='center'>
                    <EzText text='Select Month'/>
                    <EzCustomSelect
                        option={[...month]}
                        value={value}
                        onChange={e => {
                            setValue(e.target.value)
                            window.dispatch(getUserTableData({
                                uid: user.uid,
                                collection: user.select,
                                monthAndYear: e.target.value
                            }))
                        }}
                    />
                </Stack>

                <Tooltip title="Add" placement="bottom">
                  <span>
                    <IconButton
                        disabled={isAdd}
                        onClick={handleAddRow}
                    >
                      <AddIcon/>
                    </IconButton>
                  </span>
                </Tooltip>
            </Stack>
        </RootStyle>
    )
}