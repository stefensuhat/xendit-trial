import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = { keyItem: PropTypes.string.isRequired };
const defaultProps = {};

function ItemBox({ keyItem, value }) {
    console.log('keyItem: ', keyItem);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">{keyItem}</Typography>
            <Typography align="left">{value}</Typography>
        </Box>
    );
}

ItemBox.propTypes = propTypes;
ItemBox.defaultProps = defaultProps;

export default ItemBox;
