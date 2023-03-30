import PropTypes from "prop-types";

export const formattedDate = (date, format) => {
    // debugger
    if(!format) return Error('Have to pass format string');
    // const timeStamp = Math.floor(new Date(date).getTime()/1000.0)
    // Multiply by 1000 to convert from seconds to milliseconds
    // const date = new Date(timestamp * 1000);
    // Get the day and pad with leading zero if necessary
    const tempDate = new Date(date)
    const day = tempDate.getDate().toString().padStart(2, '0');
    // Get the month (January is 0) and pad with leading zero if necessary
    const month = (tempDate.getMonth() + 1).toString().padStart(2, '0');
    const year = tempDate.getFullYear();
    // Combine day, month, and year with slashes
    // return format === '' ? `${month}/${day}/${year}` : `${month}/${day}/${year}`
    switch (format) {
        case 'yyyy-mm-dd':
            return `${year}-${month}-${day}`
        case 'mm-dd-yyyy':
            return `${month}/${day}/${year}`
        default:
            return
    }
}

formattedDate.prototype = {
    timestamp: PropTypes.number.isRequired,
    format: PropTypes.string.isRequired
}