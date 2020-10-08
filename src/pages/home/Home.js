import {
    Paper, Table, TableBody, TableContainer, TableFooter,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import collect from 'collect.js';
import { Layout, Progress } from 'components';
import { TableCell as CustomCell, TableHead, TablePagination } from 'pages/home/components';
import TableToolbar from 'pages/home/components/TableToolbar.js';
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
    const [computedData, setComputedData] = useState([]);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Registration_Time');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortClick = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterSelected = ({ key, value }) => {
        setFilter((current) => {
            const filterKey = current.filter((c) => c.key !== key);

            return [...filterKey, {
                key,
                value,
            }];
        });
        setPage(0);
    };

    useEffect(() => {
        setFetching(true);
        services.get()
            .then((response) => {
                setData(response);
                setComputedData(response);
                setFetching(false);
            });
    }, []);

    useEffect(() => {
        const filteredData = data.filter((item) => {
            let exists = true;

            filter.map((f) => {
                const find = Object.keys(item)
                    .find((key) => f.key === key);

                if (exists) exists = item[find] === f.value;
            });

            return exists;
        });

        setComputedData(filteredData);
    }, [filter]);

    const handleFilterDelete = (selectedValue) => {
        setFilter((current) => current.filter((curr) => curr.key !== selectedValue.key));
    };

    const collection = collect(computedData);

    const sortedData = order === 'desc' ? collection.sortByDesc(orderBy) : collection.sortBy(orderBy);

    return (
        <Layout>
            {fetching ? <Progress /> : (
                <Paper className={classes.paper}>
                    <TableToolbar filters={filter} onFilterDelete={handleFilterDelete} />

                    <TableContainer>
                        <Table>
                            <TableHead
                                classes={classes}
                                data={data}
                                order={order}
                                orderBy={orderBy}
                                onSortClick={handleSortClick}
                                onFilterSelected={handleFilterSelected}
                            />

                            <TableBody>
                                {/* {emptyRows > 0 && ( */}
                                {/*    <TableRow style={{ height: 53 * emptyRows }}> */}
                                {/*        <TableCell colSpan={data.length + 1} /> */}
                                {/*    </TableRow> */}
                                {/* )} */}

                                {sortedData
                                    .all()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <CustomCell key={row.Business_id} data={row} columns={columns} />
                                    ))}

                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    colSpan={columns.length + 1}
                                    count={computedData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableFooter>
                        </Table>

                    </TableContainer>
                </Paper>
            )}
        </Layout>
    );
}

export default Home;
