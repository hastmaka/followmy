export const btnOutlined = {
    color: theme => theme.palette['indigoDye'],
    border: `1px solid ${'#353535ff'}`,
    '&:hover': {
        color: theme => theme.palette['white'],
        border: `1px solid ${'#fff'}`,
        backgroundColor: theme => theme.palette['jet'],
    }
}

export const btnContained = {
    fontSize: '16px',
    color: '#FFF',
    border: '1px solid transparent',
    backgroundColor: theme => theme.palette['jet'],
    boxShadow: theme => theme.shadows[0],
    transition: 'all 200ms',
    '&:hover': {
        border: '1px solid transparent',
        backgroundColor: theme => theme.palette['jet'],
        boxShadow: theme => theme.shadows[10]
    },
    '& .MuiLoadingButton-loadingIndicator': {
        color: '#FFF'
    }
}

export const linkStyle = {
    borderBottom: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 200ms',
    '&:hover': {
        borderBottom: `1px solid ${'#999'}`,
    }
}

export const ezCustomSelectSx = (from) => {
    if (from === 'toolbar') {
        return {
            color: 'white',
            '& .MuiSvgIcon-root': {
                fill: 'white'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
            }
        }
    }
}

export const tableSx = (palette) => {
    return {
        color: palette['tableColor'],
        backgroundColor: palette['tableBg'],
        border: `1px solid ${palette['tableBorder']}`,
        '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${palette['tableBorder']}`,
        },
        '& .MuiTablePagination-toolbar': {
            color: palette['tableColor'],
            '& * svg': {
                fill: palette['tableColor']
            }
        },
        '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': {
            borderBottom: `1px solid ${palette['tableBorder']}`
        },
        '& .MuiDataGrid-row--editing': {
            '& .MuiDataGrid-cell': {
                backgroundColor: palette['tableBCCellInEditingMode'],

                '& .MuiInputBase-input': {
                    color: palette['tableColor'],
                }
            },
            '& div[data-field="action"]': {
                backgroundColor: palette['tableBCActionCellInEditingMode']
            }
        },
    }
}