// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzIconButton from "../../component/EzIconButton/EzIconButton";
import EzText from "../../component/EzText/EzText";
import AddIcon from '@mui/icons-material/Add';

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

export default function Toolbar() {
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
        onClick={_ => {debugger}}
      />
    </RootStyle>
  )
}