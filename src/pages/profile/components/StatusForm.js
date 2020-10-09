import { Box, FormControl, FormLabel, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import get from 'lodash/get';
import FormHeader from 'pages/profile/components/FormHeader.js';
import React from 'react';
import {status, kycStatus} from 'utils/constant.js';
import { useSelector } from 'react-redux';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    formLabel: {
        marginBottom: theme.spacing(1),
    },
}));

function StatusForm() {
    const classes = useStyles();
    const { item } = useSelector((state) => state.business);

    return (
        <Paper component={Box} mb={2} p={2} variant="outlined">
            <FormHeader title="Status" hasEdit={false} />

            <FormControl fullWidth margin="normal">
                <FormLabel className={classes.formLabel}>Account Status</FormLabel>

                <Typography>{status[get(item, 'account_status')]}</Typography>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <FormLabel className={classes.formLabel}>KYC Status</FormLabel>
                <Typography>{kycStatus[get(item, 'kyc_status')]}</Typography>
            </FormControl>

        </Paper>

    );
}

StatusForm.propTypes = propTypes;
StatusForm.defaultProps = defaultProps;

export default StatusForm;
