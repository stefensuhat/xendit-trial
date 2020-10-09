/**
 * Project swinight
 *
 * Created by stefensuhat on 25/07/20 6.56 PM
 */

import { Button, Fab, makeStyles } from '@material-ui/core';
import { Loader } from 'components';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(({ transitions, spacing, palette }) => ({
    contained: (props) => ({
        '&:disabled': {
            // backgroundColor: palette[props.color].main,
            color: 'white',
        },
    }),
    children: {
        display: (props) => (props.loading ? 'none' : 'block'),
        transition: transitions.create(['display'], {
            duration: transitions.duration.short,
            easing: transitions.easing.easeInOut,
        }),
    },
    progress: {
        marginTop: spacing(0.5),
        // marginLeft: (props) => (props.loading ? spacing(1) : spacing(0)),
        transition: transitions.create(['margin-left'], {
            duration: transitions.duration.shortest,
            easing: transitions.easing.easeInOut,
        }),
    },
}));

function LoadingButton(p) {
    const {
        fab, label, loading, children, disabled, variant, className, color, loadingLabel, ...props
    } = p;
    const classes = useStyles({ loading, color });

    const buttonProps = {
        ...props,
        color,
        disabled: loading || disabled,
        className: `${className} ${classes.button}`,

    };

    if (fab) {
        return (
            <Fab
                {...buttonProps}
                variant={variant}
            >
                {children}
                {loading && <Loader size={18} />}
            </Fab>
        );
    }

    return (
        <Button
            {...buttonProps}
            classes={{
                contained: classes.contained,
            }}
            variant={loading ? 'contained' : variant}
        >
            <div className={classes.children}>{children}</div>
            {loading && <Loader size={18} className={classes.progress} />}
        </Button>

    );
}

const propTypes = {
    loading: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    fab: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'secondary']),
};
const defaultProps = {
    color: 'primary',
    disabled: false,
    fab: false,
    label: '',
    loading: false,
};

LoadingButton.propTypes = propTypes;
LoadingButton.defaultProps = defaultProps;

export default LoadingButton;
