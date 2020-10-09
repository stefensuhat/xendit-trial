import { Chip, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { columns } from 'utils/constant.js';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = { filters: PropTypes.array, onFilterDelete: PropTypes.func.isRequired };
const defaultProps = { filters: [] };

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
    flexGrow: {
        flexGrow: 1,
    },
}));

function TableToolbar({ filters, onFilterDelete }) {
    const classes = useStyles();

    return (
        <Toolbar>
            <Typography variant="h6" component="div" className={classes.flexGrow}>
                Business List
            </Typography>

            <div>
                {filters.map((filter) => {
                    const { label } = columns.find((col) => col.id === filter.key);

                    return (
                        <Chip
                            key={filter.key}
                            color="primary"
                            className={classes.chip}
                            label={`${label}: ${filter.value}`}
                            onDelete={() => onFilterDelete(filter)}
                        />
                    );
                })}
            </div>
        </Toolbar>
    );
}

TableToolbar.propTypes = propTypes;
TableToolbar.defaultProps = defaultProps;

export default TableToolbar;
