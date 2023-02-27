// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    height: '60px',
    borderBottom: '1px solid #999'
}));

export default function NavBar() {
  return (
    <RootStyle>
      
    </RootStyle>
  )
}