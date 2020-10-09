import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Footer, Topbar } from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.mixins.toolbar.minHeight,
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64,
            minHeight: '100%',
        },
    },
    shiftContent: {
        paddingLeft: 240,
    },
    content: {
        marginTop: theme.spacing(2),
        height: '100%',
    },
}));

const Layout = (props) => {
    const { children } = props;
    const classes = useStyles();

    return (
        <div
            className={classes.root}
        >
            <div>
                <Topbar />
            </div>
            <Container maxWidth="lg" disableGutters className={classes.content}>
                {children}
            </Container>

            <Container maxWidth="lg" disableGutters>
                <Footer />
            </Container>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
