import { Box, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined, EditOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    title: PropTypes.string,
    onEditClick: PropTypes.func,
    editMode: PropTypes.bool,
    hasEdit: PropTypes.bool,
};
const defaultProps = {
    title: '', hasEdit: true, editMode: false, onEditClick: undefined,
};

function FormHeader({
    onEditClick, hasEdit, title, editMode,
}) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">{title}</Typography>
            {hasEdit && (
                <IconButton onClick={onEditClick}>
                        {editMode ? <CloseOutlined fontSize="small" /> : <EditOutlined fontSize="small" />}
                </IconButton>
            )}
        </Box>
    );
}

FormHeader.propTypes = propTypes;
FormHeader.defaultProps = defaultProps;

export default FormHeader;
