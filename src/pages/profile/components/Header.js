import {
    AppBar, IconButton, Toolbar, Box, Hidden,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import { drawerWidth } from 'pages/profile/constant.js';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = { onDrawerToggle: PropTypes.func.isRequired, onCloseClick: PropTypes.func.isRequired, };
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'white',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        color: 'black',
    },
    title: {
        flex: 1,
    },
}));

function Header({ onDrawerToggle, onCloseClick }) {
    const classes = useStyles();

    return (
        <AppBar variant="outlined" position="fixed" className={classes.appBar}>
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Box className={classes.title} />
                <IconButton edge="start" color="primary" aria-label="close" onClick={onCloseClick}>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
