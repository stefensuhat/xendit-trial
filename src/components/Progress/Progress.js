/**
 * Project client
 *
 * Created by stefensuhat on 01/09/18 1.45 PM
 */

import {
    Box, makeStyles, Typography,
} from '@material-ui/core';
import Loader from 'components/Progress/Loader';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    label: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    label: '',
    size: 24,
};

const styles = makeStyles(() => ({
    text: {
        letterSpacing: 1.5,
    },
}));

function Progress({ label, size }) {
    const classes = styles();

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Loader size={size} />

            {label && (
                <Typography
                    gutterBottom
                    variant="overline"
                    className={classes.text}
                >
                    {label}
                </Typography>
            )}
        </Box>
    );
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
