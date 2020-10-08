import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import { ArrowDropDown } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles((theme) => ({
    menuItem: {
        padding: theme.spacing(2),
    },
}));

function ProfileButton() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // const dispatch = useDispatch();
    // const { profile } = useSelector((state) => state.auth);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        handleClose();
        // dispatch.auth.logout();
    };
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                aria-controls="popup-menu"
                color="default"
                variant="contained"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Stefen
                <ArrowDropDown />
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                <Paper style={{ minWidth: 150 }}>
                    <MenuItem className={classes.menuItem} onClick={handleLogoutClick}>Logout</MenuItem>
                </Paper>
            </Popover>

        </div>
    );
}

ProfileButton.propTypes = propTypes;
ProfileButton.defaultProps = defaultProps;

export default ProfileButton;
