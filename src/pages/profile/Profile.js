import { Box, Dialog, Slide } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { Progress } from 'components/index.js';
import Header from 'pages/profile/components/Header.js';
import InternalDetails from 'pages/profile/components/InternalDetails.js';
import LeadForm from 'pages/profile/components/LeadForm.js';
import Sidebar from 'pages/profile/components/Sidebar.js';
import ProfileService from 'pages/profile/services';
import TabContextProvider from 'pages/profile/TabContext.js';
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

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <TabContextProvider>
                {fetching ? <Progress /> : (
                    <Box display="flex">
                        <Header onDrawerToggle={handleDrawerToggle} />

                        <Sidebar data={data} open={drawerIsOpen} onDrawerClose={handleDrawerToggle} />

                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            <Grid container spacing={4}>
                                <Grid item md={6}>
                                    <LeadForm />
                                </Grid>
                                <Grid item md={6}>
                                    <InternalDetails />
                                </Grid>
                            </Grid>
                        </main>
                    </Box>
                )}
            </TabContextProvider>
        </Dialog>
    );
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
