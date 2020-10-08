import { Avatar, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Account from 'modules/Account';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'fit-content',
        cursor: 'pointer',
    },
    avatar: {
        width: 35,
        height: 35,
        backgroundColor: palette.primary.main,
        marginRight: spacing(1),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const [formIsOpen, setFormIsOpen] = useState(false);
    const { profile } = useSelector((state) => state.auth);

    function handleAccountForm() {
        setFormIsOpen((current) => !current);
    }

    return (
        <>
            <div className={classes.root} onClick={handleAccountForm}>
                <Avatar alt="Person" className={classes.avatar}>
                    {profile?.name.charAt(0)}
                </Avatar>
                <Typography variant="h4">
                    {profile?.name}
                </Typography>
                <ArrowDropDown />

            </div>
            <Account open={formIsOpen} onClose={handleAccountForm} />
        </>
    );
};

Profile.propTypes = {};

export default Profile;
