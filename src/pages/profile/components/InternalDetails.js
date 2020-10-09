import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MboForm from 'pages/profile/components/MboForm.js';
import SalesForm from 'pages/profile/components/SalesForm.js';
import StatusForm from 'pages/profile/components/StatusForm.js';
import React from 'react';
import { useDispatch } from 'react-redux';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2),
    },
}));

function InternalDetails() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        await dispatch.business.post(values);
    };

    return (
        <Box p={2}>
            <Typography variant="h5" className={classes.title}>Internal Details</Typography>

            <SalesForm onSubmit={onSubmit} />

            <MboForm onSubmit={onSubmit} />

            <StatusForm />
        </Box>
    );
}

InternalDetails.propTypes = propTypes;
InternalDetails.defaultProps = defaultProps;

export default InternalDetails;
