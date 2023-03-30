import {MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";

export const CustomSelectCell = ({id, value, options, api}) => {
    return (
        <Select
            fullWidth
            value={value}
            onChange={e => api.setEditCellValue({id, field: "date", value: e.target.value})}
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