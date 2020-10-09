import {
    Button, Chip, TableCell as MuiTableCell, TableRow, Typography,
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import styles from 'pages/home/components/styles.js';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { status } from 'utils/constant.js';

const propTypes = {
    columns: PropTypes.array,
    data: PropTypes.any,
    onDetailClick: PropTypes.func.isRequired,
};
const defaultProps = {
    data: {},
    columns: [],
};

function TableCell({ columns, data, onDetailClick }) {
    const classes = styles();

    function renderChip(value) {
        const getStatus = status[value];

        return <Chip className={classes[getStatus]} label={getStatus} />;
    }

    return (
        <TableRow hover tabIndex={-1}>
            {columns.map((column) => {
                const keys = column.id.split('|');

                return (
                    <MuiTableCell key={column.id}>
                        {keys.map((key, index) => {
                            let className = '';
                            if (column.id === 'Qualification_score') {
                                className = classes[data[key].toLowerCase()];
                            }

                            if (column.id === 'Account_status') {
                                return <Fragment key={key}>{renderChip(data[key])}</Fragment>;
                            }

                            return (
                                <Typography
                                    key={key}
                                    className={className}
                                    variant={index < 1 ? 'subtitle2' : 'body2'}
                                    color={index < 1 ? 'textPrimary' : 'textSecondary'}
                                >
                                    {column.type === 'datetime'
                                        ? format(parseISO(data[key]), 'EEEE, dd MMM yyyy HH:mm:ss')
                                        : data[key]}
                                    <br />
                                </Typography>
                            );
                        })}
                    </MuiTableCell>
                );
            })}

            <MuiTableCell align="right">
                <Button id="detail-button" aria-label="edit" variant="outlined" color="primary" onClick={() => onDetailClick()}>
                    DETAILS
                </Button>
            </MuiTableCell>
        </TableRow>
    );
}

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

export default TableCell;
