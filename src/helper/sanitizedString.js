export const sanitizedString = (string) => {
    const sanitizedStr = string.replace(/[.,_]/g, ' ');

    return sanitizedStr.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    )
}