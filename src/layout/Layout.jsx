// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import NavBar from "../section/navBar/NavBar";
import {Outlet} from "react-router-dom";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Layout() {
    return (
        <RootStyle>
            <NavBar/>
            <Outlet/>
        </RootStyle>
    );
}
