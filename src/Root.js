import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import stores from 'stores';
import theme from 'themes';

const propTypes = { children: PropTypes.node.isRequired };
const defaultProps = {};

function Root({ children }) {
    return (
        <Provider store={stores}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
