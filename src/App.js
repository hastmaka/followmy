// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import Router from "./routes";
import { useEffect } from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function App() {


    useEffect(_ => {
        // window.dispatch = dispatch;
        // window.confirm = confirm;
        // window.setChildren = setChildren;
        // window.displayNotification = displayNotification;
    }, [])
    return (
        <Router/>
    );
}
 