// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {NavLink, useNavigate} from "react-router-dom";
import EzText from "../../components/EzText/EzText";
import {useSelector} from "react-redux";
import {logOut} from "../../helper/helper";

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

const NavLinkContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    '& > a': {
        textDecoration: 'none',
        // borderBottom: '1px solid transparent',
        padding: '5px 15px',
        borderRadius: '4px',
        transition: 'all 400ms',
        '&.active': {
            color: 'red'
        },
        '&:hover': {
            backgroundColor: '#e7e7e7',
            // borderBottom: '1px solid red',
        }
    }
}))

export default function NavBar() {
    const navigate = useNavigate();
    const {user} = useSelector(slice => slice.admin)
    return (
        <RootStyle>
            <NavLinkContainer>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={`/${user.select}`}>Data</NavLink>
                <NavLink to={'/about-us'}>About US</NavLink>
            </NavLinkContainer>
            <Stack direction='row' gap='10px' alignItems='center'>
                <EzText text={user.email}/>
                <Button onClick={_ => logOut(navigate)}>Log Out</Button>
            </Stack>

        </RootStyle>
    )
}