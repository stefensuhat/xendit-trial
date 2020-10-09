import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    TableCell,
    TableHead as MuiTableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/styles';
import collect from 'collect.js';
import { columns } from 'utils/constant.js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const propTypes = {
    data: PropTypes.array,
    onSortClick: PropTypes.func.isRequired,
    onFilterSelected: PropTypes.func.isRequired,
    orderBy: PropTypes.oneOf(['asc', 'desc']),
    order: PropTypes.string,
};
const defaultProps = {
    data: [],
    orderBy: 'desc',
    order: '',
};

const useStyles = makeStyles(() => ({
    icon: {
        fontSize: 16,
    },
}));

function TableHead(props) {
    const {
        data, order, orderBy, onSortClick, onFilterSelected,
    } = props;
    const classes = useStyles();

    const [filterData, setFilterData] = useState([]);
    const [filterKey, setFilterKey] = useState([]);
    const [anchorEl, setAnchorEl] = useState();

    const createSortHandler = (property) => (event) => {
        onSortClick(event, property);
    };

    const handleFilterClick = (e, id) => {
        setAnchorEl(e.currentTarget);
        const collection = collect(data);
        const filter = collection.unique(id)
            .map((d) => d[id])
            .sort()
            .all();

        setFilterKey(id);
        setFilterData(filter);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterMenuClick = (value) => {
        onFilterSelected({ key: filterKey, value });
        handleClose();
    };

    return (
        <>
            <MuiTableHead>
                <TableRow>

                    {columns.map((column) => (
                        <TableCell key={column.id}>
                            <Box display="flex" alignItems="center">
                                {column.sort
                                    ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={createSortHandler(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : column.label}

                                {column.filter && (
                                    <IconButton
                                        aria-controls={column.id}
                                        aria-haspopup="true"
                                        onClick={(e) => handleFilterClick(e, column.id)}
                                    >
                                        <FilterListIcon className={classes.icon} />
                                    </IconButton>
                                )}
                            </Box>
                        </TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </MuiTableHead>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {filterData.map((filter) => (
                    <MenuItem onClick={() => handleFilterMenuClick(filter)}>{filter}</MenuItem>

                ))}
            </Menu>
        </>
    );
}

TableHead.propTypes = propTypes;
TableHead.defaultProps = defaultProps;

export default TableHead;
