// material
import {MenuItem, Select, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function EzCustomSelect({option, value, onChange, from = null, ...rest}) {

    return (
        <Select
            value={value}
            onChange={onChange}
            {...rest}
            sx={{
                color: 'white',
                '& .MuiSvgIcon-root': {
                    fill: 'white'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent'
                }
            }}
        >
            {option.map((option) =>
                <MenuItem
                    key={!!from ? option.value : option}
                    value={!!from ? option.value : option}
                >
                    {!!from ? option.label : option}
                </MenuItem>
            )}
        </Select>
    );
}

EzCustomSelect.prototype = {
    option: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}