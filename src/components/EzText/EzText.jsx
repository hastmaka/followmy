// material
import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Typography)(({theme, cap}) => ({
    fontSize: '14px',
    textTransform: cap === 'true' ? 'capitalize' : '',
    // fontWeight: 600,
    // color: theme.palette.ecommerce.inactive_color
}));

//----------------------------------------------------------------

export default function EzText({text, sx, cap = false, ...rest}) {
    return (
        <RootStyle sx={{...sx}} {...rest} variant='span' cap={cap.toString()}>
            {text}
        </RootStyle>
    );
}