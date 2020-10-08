import { AppBar, Toolbar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Nav from 'components/Layout/components/Topbar/Nav.js';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({

    root: {
        boxShadow: 'none',
        backgroundColor: 'white',
        marginTop: theme.mixins.toolbar.minHeight,
        border: `1px solid ${theme.palette.divider}`,
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
    nav: {
        marginRight: theme.spacing(1),
    },
}));

const SubHeader = (props) => {
    const { className, ...rest } = props;
    const classes = useStyles();

    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Container maxWidth="lg" disableGutters>
                <Toolbar disableGutters>
                    <Nav />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

SubHeader.propTypes = {
    className: PropTypes.string,
};

SubHeader.defaultProps = {
    className: '',
};

export default SubHeader;
