// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {NavLink, useNavigate} from "react-router-dom";
import EzText from "../../components/EzText/EzText";
import {useSelector} from "react-redux";

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    borderBottom: '1px solid #e2e2e2',
    backgroundColor: theme.palette['white'],
    padding: '0 20px'
}));

export default function NavBar() {
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.admin)
    return (
        <RootStyle>
            <NavLink to={'/'}>Home</NavLink>
            <Stack direction='row' gap='10px' alignItems='center'>
                <EzText text={user.email}/>
                <Button onClick={_ => {
                    localStorage.removeItem('user')
                    navigate('/login')
                    window.location.reload()
                }}>Log Out</Button>
            </Stack>

        </RootStyle>
    )
}