export const addNeededSlices = (setRunApp) => {
    return setRunApp(true)
}

export const verifySession = () => {
    return (JSON.parse(localStorage.getItem('token')));
}