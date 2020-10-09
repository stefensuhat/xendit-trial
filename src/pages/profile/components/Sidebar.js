import { Drawer, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SidebarContent from 'pages/profile/components/SidebarContent.js';
import { drawerWidth } from 'pages/profile/constant.js';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    open: PropTypes.bool,
    onDrawerClose: PropTypes.func.isRequired,
    activeKey: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};
const defaultProps = { open: false };

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

function Sidebar({
    open, activeKey, onTabChange, onDrawerClose,
}) {
    const classes = useStyles();

    const content = (
        <SidebarContent onTabChange={onTabChange} activeKey={activeKey} />
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    open={open}
                    onClose={onDrawerClose}
                    variant="temporary"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="permanent"
                    open
                >
                    {content}
                </Drawer>
            </Hidden>
        </nav>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
