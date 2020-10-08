import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 0),

        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2, 1),
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="caption" mr={1}>
                &copy;
                {' '}
                Xendit Admin Dashboard - 2020.
            </Typography>
            <Box mr={1} />
            <Typography variant="caption">
                Created with
                {' '}
                <span role="img" aria-label="love">😘</span>
            </Typography>
        </div>
    );
};

Footer.propTypes = {};

export default Footer;
