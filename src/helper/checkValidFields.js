export const checkValidFields = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (!['date', 'id', 'dollarsPerHour'].includes(key)) {
                if (value === null || value === "" || isNaN(value)) {
                    return {key, value};
                }
            }
        }
    }
    return true;
}