import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { favoritePath, newsletterPath, universitiesPath } from 'utils/routeConstant.js';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    nav: {
        marginRight: theme.spacing(1),
    },
    lists: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        height: 15,
    },
}));

function Nav() {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleNavClick = (value) => navigate(`/${value}`);

    return (
        <div className={classes.lists}>
            <Button onClick={() => handleNavClick(universitiesPath)}>
                University
            </Button>
            <Divider orientation="vertical" variant="middle" className={classes.border} />
            <Button onClick={() => handleNavClick(favoritePath)}>
                Favorite
            </Button>
            <Divider orientation="vertical" variant="middle" className={classes.border} />
            <Button onClick={() => handleNavClick(newsletterPath)}>
                Newsletter
            </Button>
        </div>
    );
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
