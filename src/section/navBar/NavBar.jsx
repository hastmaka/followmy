// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {NavLink, useNavigate} from "react-router-dom";

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    borderBottom: '1px solid #e2e2e2',
    backgroundColor: theme.palette['white']
}));

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <RootStyle>
            <NavLink to={'/'}>Home</NavLink>
            <Button onClick={_ => {
                localStorage.removeItem('token')
                navigate('/login')
                window.location.reload()
            }}>Log Out</Button>
        </RootStyle>
    )
}