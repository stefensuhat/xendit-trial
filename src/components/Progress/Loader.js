import { CircularProgress, makeStyles } from '@material-ui/core';
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    size: PropTypes.number,
    className: PropTypes.string,
};
const defaultProps = {
    size: 24,
    className: '',
};

const styles = makeStyles((theme) => ({
    facebook: {
        position: 'relative',
    },
    facebook1: {
        color: '#CECECE',
    },
    facebook2: {
        color: theme.palette.secondary.light,
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
}));

export function Loader({ size, className }) {
    const classes = styles();

    return (
        <div className={cx(classes.facebook, className)}>
            <CircularProgress
                variant="determinate"
                value={100}
                className={classes.facebook1}
                size={size}
                thickness={4}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.facebook2}
                size={size}
                thickness={4}
            />
        </div>
    );
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
