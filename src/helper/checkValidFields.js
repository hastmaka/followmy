export const checkValidFields = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (!['date', 'id', 'dollarsPerHour', 'gas'].includes(key)) {
                if (value === null || value === "" || isNaN(value) || value <= 0) {
                    return {key, value};
                }
            }
        }
    }
    return true;
}