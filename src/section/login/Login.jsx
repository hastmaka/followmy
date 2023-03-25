import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, IconButton, InputAdornment, Stack} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
//
import LoginWrapper from './LoginWrapper';
import EzLoadingBtn from "../../components/EzLoadingBtn/EzLoadingBtn";
import EzButton from "../../components/EzButton/EzButton";
import EzTextField from "../../components/EzTextField/EzTextField";
import EzText from "../../components/EzText/EzText";
import {btnOutlined} from "../../helper/Style";

//dynamic import

//----------------------------------------------------------------
export default function Login({modal}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
    const [notification, setNotification] = useState({
        type: !!location?.state?.type ? location.state.type : '',
        message: !!location?.state?.message ? location.state.message : ''
    })

    const onLoginWithGoogle = async () => {
        // setGoogleBtnLoading(true);
        // try {
        //     const googleUser = await import('../../helper/firebase/FirebaseAuthService').then(module => {
        //         return module.loginWithGoogle()
        //     });
        //     const dbUser = await import('../../helper/firebase/FirestoreApi').then(module => {
        //         return module.getUser(googleUser.user.uid)
        //     });
        //     if(!dbUser) {
        //         const res = await import('../../helper/Helper').then(module => {
        //             return module.createAccountProcess(googleUser.user)
        //         });
        //         if(res === 'created') {
        //             const dbCurrentUser = await import('../../helper/FirestoreApi').then(module => {
        //                 return module.getUser(googleUser.user.uid)
        //             });
        //             import('../../helper/Helper').then(module => {
        //                 module.loginProcess({
        //                     token: googleUser.user.accessToken,
        //                     dbUser: dbCurrentUser,
        //                     modal,
        //                     navigate,
        //                     location,
        //                     setLoading
        //                 }).then();
        //             });
        //
        //         }
        //     }
        //     import('../../helper/Helper').then(module => {
        //         module.loginProcess({
        //             token: googleUser.user.accessToken,
        //             dbUser,
        //             modal,
        //             navigate,
        //             location,
        //             setLoading
        //         }).then();
        //     });
        // } catch (err) {
        //     if(err.code === 'auth/popup-closed-by-user') {
        //         setGoogleBtnLoading(false)
        //     } else {
        //         window.displayNotification({
        //             t: 'error',
        //             c: 'There is some error with you Google Account'
        //         })
        //     }
        // }
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email'),
            password = data.get('password');
        setLoading(true);
        const firebaseUser = await import('../../helper/firebase/FirebaseAuthService').then(module => {
            return module.loginUser(email, password)
        });
        if(firebaseUser?.type === 'error') {
            setNotification({type: 'error', message: firebaseUser.content})
        } else {
            const dbUser = await import('../../helper/firebase/FirestoreApi').then(module => {
                return module.getUser(firebaseUser.uid)
            });
            localStorage.setItem('token', JSON.stringify(firebaseUser.accessToken))
            navigate('/', {state: dbUser})
        }
        setLoading(false);
    }

    return (
        <LoginWrapper modal={modal}>
            <EzText text='Sign in' variant='h4' sx={{textAlign: 'center', margin: '0 20px 10px 20px', fontSize: '1.5rem'}}/>
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
            <Box component='form' onSubmit={onLoginSubmit}>
                <EzTextField
                    required
                    autoFocus
                    type='email'
                    name='email'
                    label='Email'
                />
                <EzTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    sx={{color: '#999'}}
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
                    Sign in
                </EzLoadingBtn>
                <EzLoadingBtn
                    onClick={onLoginWithGoogle}
                    startIcon={<GoogleIcon/>}
                    fullWidth
                    size='large'
                    variant='outlined'
                    loading={googleBtnLoading}
                >
                    Sign in with Google
                </EzLoadingBtn>
                <Stack flexDirection='row' gap='5px' justifyContent='space-between'>
                    {!modal && <EzButton
                        sx={{...btnOutlined}}
                        variant='outlined'
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot
                    </EzButton>}
                    <EzButton
                        sx={{...btnOutlined}}
                        fullWidth={!!modal}
                        variant='outlined'
                        onClick={() => navigate('/create-account')}
                    >
                        Create
                    </EzButton>
                </Stack>
            </Box>
        </LoginWrapper>
    );
}
