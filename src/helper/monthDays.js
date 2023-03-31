import PropTypes from "prop-types";

const daysInMonth = {
    1: 31, // January
    2: {
        normal: 28, // February in a normal year
        leap: 29 // February in a leap year
    },
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31 // December
};


export const monthDays = (id) => {
    //check february
    if(id) {
        const month = +id.split('-')[0],
            days = [];
        for (let i = 1; i < daysInMonth[month]; i++) {
            days.push(i.toString().padStart(2, '0'))
        }
        return days
    } else {
        return []
    }

}

monthDays.prototype = {
    id: PropTypes.string.isRequired
}