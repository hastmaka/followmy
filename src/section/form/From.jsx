// material
import {Box, Stack, TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useState} from "react";

const RootStyle = styled(Stack)(({theme}) => ({}));

export default function Form() {
    const [data, setData] = useState({});
    const handleSubmit = () => {
        debugger
    }
    return (
        <Box component='form' onSubmit={handleSubmit}>
            <TextField
                value
            />
        </Box>
    )
}