import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';

class CustomPaginationActionsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
    }

    setPage(newPage) {
        this.setState({
            page: newPage
        });
    }

    setRowsPerPage(rowsPerPage) {
        this.setState({
            rowsPerPage
        });
    }

    render() {
        const classes = makeStyles({
            table: {
                minWidth: 500,
            },
        });

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.props.rows.length - this.state.page * this.state.rowsPerPage);

        const handleChangePage = (event, newPage) => {
            this.setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            this.setRowsPerPage(parseInt(event.target.value, 10));
            this.setPage(0);
        };
        const columns = [
            { id: 'SlNo', label: 'Sl No', minWidth: 10, align: 'center' },
            { id: 'Link', label: 'Link', minWidth: 100, align: 'center' },
            { id: 'Solved', label: 'Solved ?', minWidth: 100, align: 'center' },
        ];
        return (
            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, width: column.width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state.rowsPerPage > 0
                            ? this.props.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            : this.props.rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.slNo}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    {row.solved}
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={this.props.rows.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
}

export default CustomPaginationActionsTable;
