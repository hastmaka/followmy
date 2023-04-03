// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    margin: '10px',
    height: 'calc(100vh - 80px)'
}));

//----------------------------------------------------------------

export default function Personal() {
    return (
        <RootStyle>
            Personal
        </RootStyle>
    );
}