import { AppBar, Button, Container, Toolbar, useMediaQuery, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import ProfileButton from 'components/Layout/components/Topbar/ProfileButton.js';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
    nav: {
        marginRight: theme.spacing(1),
    },
    appName: {
        color: 'white',
    },
}));

const Topbar = (props) => {
    const { className, onSidebarOpen, ...rest } = props;
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('md'));
    const classes = useStyles();
    const navigate = useNavigate();
    // const { authenticated } = useSelector((state) => state.auth);
    const authenticated = false;

    const handleNavigate = () => {
        navigate('/auth/register');
    };

    return (
        <AppBar
            {...rest}
            className={classes.root}
        >
            <Container maxWidth="lg" disableGutters={!isMobile}>
                <Toolbar disableGutters>
                    <Typography variant="h5" className={classes.appName}>
                        Xendit Admin Dashboard - Onboarding Management
                    </Typography>

                    <div className={classes.flexGrow} />
                    {!authenticated
                        ? (
                            <ProfileButton />
                        )
                        : (
                            <Button
                                color="primary"
                                variant="contained"
                                disableElevation
                                onClick={handleNavigate}
                                className={classes.nav}
                            >
                                Login / Register
                            </Button>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
};

Topbar.defaultProps = {
    className: '',
    onSidebarOpen: () => {
    },
};

export default Topbar;
