import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
// material
import {CssBaseline} from '@mui/material';
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
//
import palette from './palette';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({children}) {
    const themeOptions = useMemo(
        () => ({
            palette
        }),
        []
    );

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <StyledComponentsThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </StyledComponentsThemeProvider>
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}