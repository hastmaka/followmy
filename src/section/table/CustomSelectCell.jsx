import {MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";

export const CustomSelectCell = ({id, value, options, api, daysAlreadyAdded, isNew}) => {
    return (
        <Select
            fullWidth
            value={value}
            onChange={e => {
                if(!daysAlreadyAdded.length && isNew) {
                    return api.setEditCellValue({id, field: "date", value: e.target.value})
                }
                if(daysAlreadyAdded.length >= 1) {
                    if(!daysAlreadyAdded.includes(e.target.value)) {
                        api.setEditCellValue({id, field: "date", value: e.target.value})
                    } else {
                        window.displayNotification({
                            type: 'warning',
                            content: 'This day already exist'
                        })
                    }
                }

            }}
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