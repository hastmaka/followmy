// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import Form from "./form/From";
import Main from "./main/Main";
//
import NavBar from "./navBar/NavBar";

const RootStyle = styled(Stack)(({theme}) => ({}));

export default function Home() {
  return (
    <RootStyle>
        <NavBar/>

        {/* <Form/>   */}

        <Main/>


        {/* footer */}
    </RootStyle>
  )
}