import {MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";

export const CustomSelectCell = ({options, api}) => {
    const [value, setValue] = useState()
    return (
        <Select
            fullWidth
            value={value}
            onChange={e => setValue(e.target.value)}
            renderValue={(selected) => selected}
        >
            {options.map(item =>
                <MenuItem key={item} value={item}>{item}</MenuItem>
            )}
        </Select>
    );
}

CustomSelectCell.prototype = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    api: PropTypes.object.isRequired
}