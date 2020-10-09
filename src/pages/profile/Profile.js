import {
    Box, Dialog, Grid, Slide,
} from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Progress } from 'components/Progress';
import Header from 'pages/profile/components/Header.js';
import InternalDetails from 'pages/profile/components/InternalDetails.js';
import Sidebar from 'pages/profile/components/Sidebar.js';
import { navs } from 'pages/profile/constant.js';
import ProfileService from 'pages/profile/services';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const propTypes = { open: PropTypes.bool };
const defaultProps = { open: true };

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function Profile({ open }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [fetching, setFetching] = useState(false);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [activeKey, setActiveKey] = useState(navs[1].key);

    useEffect(() => {
        setFetching(true);

        dispatch.business.fetchSingle();

        ProfileService.get()
            .then((response) => {
                setFetching(false);
                setData(response);
            });
    }, []);

    const handleDrawerToggle = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            {fetching ? <Progress />
                : (
                    <Box display="flex">
                        <Header onDrawerToggle={handleDrawerToggle} />

                        <Sidebar
                            data={data}
                            activeKey={activeKey}
                            open={drawerIsOpen}
                            onTabChange={handleTabChange}
                            onDrawerClose={handleDrawerToggle}
                        />

                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            <Grid container spacing={4}>
                                <Grid item md={8}>
                                    <TabContext value={activeKey}>
                                        {navs.map(({ key, element: Component }) => (
                                            <TabPanel value={key} key={key}>
                                                <Component />
                                            </TabPanel>
                                        ))}
                                        {/* <LeadForm /> */}
                                    </TabContext>
                                </Grid>
                                <Grid item md={4}>
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
