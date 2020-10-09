import {
    Avatar, Box, Chip, List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { navs } from 'pages/profile/constant.js';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const imgUrl = 'https://cdn.icon-icons.com/icons2/1556/PNG/512/3377055-bowl-food-noodle-ramen_107434.png';

const propTypes = {
    activeKey: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    name: {
        fontWeight: 600,
    },
    navWrapper: {
        width: '100%',
    },
}));

function SidebarContent({ activeKey, onTabChange }) {
    const classes = useStyles();
    const { item } = useSelector((state) => state.business);

    return (
        <Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={2.5} p={2}>
                <Avatar src={imgUrl} className={classes.avatar} />

                <Box my={1}>
                    <Typography variant="subtitle1" className={classes.name}>
                        {get(item, 'business_name')}
                    </Typography>
                    <Typography variant="subtitle2" align="center">
                        {get(item, 'registration_details.entity_type')}
                    </Typography>
                </Box>

                <Chip label={upperCase(get(item, 'account_status'))} />

            </Box>

            <div className={classes.navWrapper}>
                <List component="nav">
                    {navs.map((nav) => (
                        <ListItem
                            button
                            key={nav.key}
                            selected={activeKey === nav.key}
                            onClick={() => onTabChange(nav.key)}
                        >
                            <ListItemText>{nav.label}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Box>
    );
}

SidebarContent.propTypes = propTypes;
SidebarContent.defaultProps = defaultProps;

export default SidebarContent;
