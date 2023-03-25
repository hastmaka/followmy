import {Outlet} from "react-router-dom";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import NavBar from "./navBar/NavBar";

const RootStyle = styled(Stack)(({theme}) => ({
    minHeight: '100vh'
}));

export default function Home() {
    return (
        <RootStyle>
            <NavBar/>

            {/* <Form/> */}

            <Outlet/>


            {/* footer */}
        </RootStyle>
    )
}