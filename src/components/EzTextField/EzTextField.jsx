// material
import {TextField} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette[1],
        },
        '&:hover fieldset': {
            borderColor: theme.palette[1],
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette[1],
            borderWidth: 1,
        },
    },
    '& label.MuiFormLabel-root': {
        color: theme.palette[1],
    }
}));

//----------------------------------------------------------------

export default function EzTextField({required, autoFocus, ...field}) {
    return (
        <RootStyle
            required
            autoFocus
            {...field}
        >

        </RootStyle>
    );
}