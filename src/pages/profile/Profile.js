import {
    Box, Dialog, Grid, Slide, useTheme,
} from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Progress } from 'components/Progress';
import Header from 'pages/profile/components/Header.js';
import InternalDetails from 'pages/profile/components/InternalDetails.js';
import Sidebar from 'pages/profile/components/Sidebar.js';
import { navs } from 'pages/profile/constant.js';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
};
const defaultProps = { open: true };

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'hidden',

        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0),
        },
    },
    toolbar: theme.mixins.toolbar,
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function Profile({ open, onClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { effects } = useSelector((state) => state.loading);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [activeKey, setActiveKey] = useState(navs[0].key);

    useEffect(() => {
        dispatch.business.fetchSingle();
    }, []);

    const handleDrawerToggle = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            {effects.business.find ? <Progress />
                : (
                    <Box display="flex">
                        <Header onDrawerToggle={handleDrawerToggle} onCloseClick={onClose} />

                        <Sidebar
                            activeKey={activeKey}
                            open={drawerIsOpen}
                            onTabChange={handleTabChange}
                            onDrawerClose={handleDrawerToggle}
                        />

                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            <Grid container spacing={theme.breakpoints.down('md') ? 0 : 4}>
                                <Grid item md={8} xs={12}>
                                    <TabContext value={activeKey}>
                                        {navs.map(({ key, element: Component }) => (
                                            <TabPanel value={key} key={key}>
                                                <Component />
                                            </TabPanel>
                                        ))}
                                    </TabContext>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <InternalDetails />
                                </Grid>
                            </Grid>
                        </main>
                    </Box>
                )}
        </Dialog>
    );
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
