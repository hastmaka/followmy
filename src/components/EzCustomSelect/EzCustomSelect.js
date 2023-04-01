// material
import {MenuItem, Select, Stack} from "@mui/material";
import PropTypes from "prop-types";
import {ezCustomSelectSx} from "../../helper/Style";

export default function EzCustomSelect({option, value, onChange, from, ...rest}) {
    return (
        <Select
            value={value}
            onChange={onChange}
            {...rest}
            sx={{...ezCustomSelectSx(from)}}
        >
            {option.map((option) =>
                <MenuItem
                    key={from === 'toolbar' ? option : option.value}
                    value={from === 'toolbar' ? option : option.value}
                >
                    {from === 'toolbar' ? option : option.label}
                </MenuItem>
            )}
        </Select>
    );
}

EzCustomSelect.prototype = {
    option: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}