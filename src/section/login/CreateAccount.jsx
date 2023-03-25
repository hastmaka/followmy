import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//
import LoginWrapper from './LoginWrapper';
import EzLoadingBtn from "../../components/EzLoadingBtn/EzLoadingBtn";
import EzTextField from "../../components/EzTextField/EzTextField";
import EzButton from "../../components/EzButton/EzButton";
import EzText from "../../components/EzText/EzText";

//----------------------------------------------------------------

export default function CreateAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({type: '', message: ''})
    // debugger

    const onCreateAccountSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password'),
            confirmPassword = data.get('confirmPassword');
        if(password !== confirmPassword) {
            setNotification({type: 'error', message: `Password doesn't match`})
        } else if (password.length < 6) {
            setNotification({type: 'error', message: `Password min length is 6 character`})
        } else {
            setLoading(true)
            const user = await import('../../helper/firebase/FirebaseAuthService').then(module => {
                return module.registerUser(email, password)
            })
            if(user?.type === 'error') {
                setNotification({type: 'error', message: user.content})
            } else {
                const dbUser = await import('../../helper').then(module => {
                    return module.createAccountProcess(user)
                });
                if(dbUser === 'created') {
                    navigate('/login', {state: {type: 'success',message: `User created Successfully`}})
                } else {
                    setNotification({type: 'error',message: `Error while creating the account`})
                }
            }
            setLoading(false)
        }
    }

    return (
        <LoginWrapper>
            <EzText text='Sign up' variant='h4' sx={{textAlign: 'center', margin: '0 20px 10px 20px', fontSize: '1.5rem'}}/>
            {!!notification.type &&
                <EzText
                    text={notification.message}
                    sx={{
                        color: notification.type === 'error' ? 'red' : 'green',
                        textAlign: 'center',
                        margin: '0 0 10px 0',
                        fontSize: '0.8rem'
                    }}
                />
            }
            <Box component='form' onSubmit={onCreateAccountSubmit}>
                <EzTextField required type='email' name='email' label='Email address' autoFocus/>
                <EzTextField
                    required
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: '#999'
                                    }}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <EzTextField
                    required
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{
                                        color: '#999'
                                    }}
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    Create
                </EzLoadingBtn>
                <EzButton
                    sx={{
                        padding: '8px 22px',
                        height: '48px'
                    }}
                    variant='outlined'
                    color='error'
                    onClick={() => navigate('/login')}
                >Cancel</EzButton>
            </Box>
        </LoginWrapper>
    );
}
