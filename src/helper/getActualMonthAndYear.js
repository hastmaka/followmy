export const getActualMonthAndYear = () => {
    const currentDate = new Date();
    // add 1 since getMonth() returns 0-based index
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    return `${currentMonth}-${currentYear}`
}