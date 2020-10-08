import {
    Button, colors, List, ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { routeLists } from 'utils/index.js';

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {
            color: theme.palette.primary.main,
        },
    },
}));

const CustomRouterLink = forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{ flexGrow: 1 }}
    >
        <RouterLink {...props} />
    </div>
));

const SidebarNav = (props) => {
    const { pages, className, ...rest } = props;

    const classes = useStyles();

    return (
        <List
            {...rest}
            className={clsx(classes.root, className)}
        >
            {routeLists.map(({ nav, path, exact }) => {
                if (!exact) return true;

                return (
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={nav.title}
                    >
                        <Button
                            activeClassName={classes.active}
                            className={classes.button}
                            component={CustomRouterLink}
                            to={path}
                        >
                            <div className={classes.icon}>{nav.icon}</div>
                            {nav.title}
                        </Button>
                    </ListItem>
                );
            })}
        </List>
    );
};

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired,
};

export default SidebarNav;
