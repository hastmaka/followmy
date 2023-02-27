// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import Router from "./routes";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function App() {
    return (
        <Router/>
    );
}
 