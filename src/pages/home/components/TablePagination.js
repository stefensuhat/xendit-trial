import { TablePagination as MuiTablePagination, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    count: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
};
const defaultProps = {
    count: 0,
    rowsPerPage: 10,
    page: 1,
};

function TablePagination({
    count, rowsPerPage, page, onChangeRowsPerPage, onChangePage,
}) {
    return (
        <TableRow>
            <MuiTablePagination
                rowsPerPageOptions={[10, 25, 50, {
                    label: 'All',
                    value: -1,
                }]}
                colSpan={10}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
        </TableRow>
    );
}

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;

export default TablePagination;
