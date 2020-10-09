import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles((theme) => {
    return {
        title: {
            marginBottom: theme.spacing(2),
        },
    };
});

function LeadForm(props) {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h5" className={classes.title}>Lead Qualification</Typography>

            <Paper component={Box} p={2} variant="outlined">
                content
            </Paper>
        </>
    );
}

LeadForm.propTypes = propTypes;
LeadForm.defaultProps = defaultProps;

export default LeadForm;
