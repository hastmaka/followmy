export const getColumnDataToRenderNewRow = (columns) => {
    const newRow = {};
    columns.forEach(column => {
        switch (column.field) {
            case 'date':
                newRow[column.field] = ''
                break;
            case 'action':
                break;
            default:
                newRow[column.field] = 0
        }
    })
    return newRow
}