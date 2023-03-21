// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzIconButton from "../../component/EzIconButton/EzIconButton";
import EzText from "../../component/EzText/EzText";
import AddIcon from '@mui/icons-material/Add';
import {GridRowModes} from "@mui/x-data-grid";
import { createId } from "../../helper";

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

export default function Toolbar({setRows, setRowModesModel}) {
  const handleAddRow = async () => {
    const id = createId(20);
    setRows(prev => [{
      id, 
      date: '', 
      uber: 0, 
      lyft: 0, 
      miles: 0, 
      gas: 0, 
      expenses: 0, 
      dolarsPerHour: 0, 
      isNew: true
    }, ...prev]);
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
        text='Uber and Lyft Profit Calculator'
        sx={{color: 'white'}}
      />
      <EzIconButton
        icon={<AddIcon/>}
        size='medium'
        toolTipTitle='Add'
        onClick={handleAddRow}
      />
    </RootStyle>
  )
}