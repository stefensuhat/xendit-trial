import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { Layout, Progress } from 'components';
import { TableCell as CustomCell } from 'pages/home/components';
import { columns } from 'pages/home/constant.js';
import services from 'pages/home/services.js';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
    paper: {
        width: '100%',
    },
}));

function Home() {
    const classes = useStyles();
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setFetching(true);
        services.get()
            .then((response) => {
                setData(response);
                setFetching(false);
            });
    }, []);

    return (
        <Layout>
            {fetching ? <Progress /> : (
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={data.length + 1} />
                                    </TableRow>
                                )}

                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <CustomCell key={row.Business_id} data={row} columns={columns} />
                                    ))}

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 50, {
                                            label: 'All',
                                            value: -1,
                                        }]}
                                        colSpan={columns.length + 1}
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </TableContainer>
                </Paper>
            )}
        </Layout>
    );
}

export default Home;
