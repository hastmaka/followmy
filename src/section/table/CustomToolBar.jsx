import {useState} from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
// material
import {IconButton, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {GridRowModes} from "@mui/x-data-grid";
//
import EzText from "../../components/EzText/EzText";
import {createId, getActualMonthAndYear} from "../../helper";
import EzCustomSelect from "../../components/EzCustomSelect/EzCustomSelect";
import {getUserTableData} from "../../helper/firebase/FirestoreApi";
import {getColumnDataToRenderNewRow} from "../../helper/getColumnDataToRenderNewRow";
import {sanitizedString} from "../../helper/sanitizedString";

//---------------------------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '60px',
    border: `1px solid ${theme.palette['tableBorder']}`,
    backgroundColor: theme.palette['indigoDye'],
    borderRadius: '4px 4px 0 0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 10px',
    justifyContent: 'space-between'
}));

//---------------------------------------------------------------------------------
/**
 *
 * @param setRows - to manipulate table rows (add a new row in this case)
 * @param isAddActive - false by default, true if a new row was added and is in edit mode
 * @param setIsAddActive - to change the state of isAddActive
 * @param setRowModesModel - to be able to manipulate the new row that was just added and put it in edit mode
 * @param user - object that represent the user variable in store
 * @param columns - table columns to get the field and render dynamically the new row
 * @returns {JSX.Element}
 * @constructor
 */

export default function CustomToolBar({setRows, isAddActive, setIsAddActive, setRowModesModel, user, columns}) {
    const {month} = useSelector(slice => slice.admin)
    const [value, setValue] = useState(getActualMonthAndYear())
    const handleAddRow = async () => {
        setIsAddActive(true)
        const id = createId(20);
        setRows(prev => {
            return [...prev, {id, ...getColumnDataToRenderNewRow(columns), isNew: true}]
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
                text={sanitizedString(user.select)}
                sx={{color: 'white'}}
            />

            <Stack direction='row' gap='10px' alignItems='center'>
                <Stack direction='row' gap='10px' alignItems='center'>
                    <EzText text='Select Month'/>
                    <EzCustomSelect
                        disabled={isAddActive}
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
                        from='toolbar'
                    />
                </Stack>

                <Tooltip title="Add" placement="bottom">
                  <span>
                    <IconButton
                        disabled={isAddActive}
                        onClick={handleAddRow}
                    >
                      <AddIcon
                          sx={({palette}) => ({
                              fill: isAddActive ? palette['tableBorder'] : palette['tableColor']
                          })}
                      />
                    </IconButton>
                  </span>
                </Tooltip>
            </Stack>
        </RootStyle>
    )
}

CustomToolBar.prototype = {
    setRows: PropTypes.func.isRequired,
    isAddActive: PropTypes.bool.isRequired,
    setIsAddActive: PropTypes.func.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
}