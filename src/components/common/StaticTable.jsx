import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useMediaQuery,
    TablePagination,
} from "@mui/material";
import { shadow } from "../../styles/global";

/**
 * StaticTable Component
 *
 * A reusable table component that displays data in a structured format.
 *
 * Props:
 * @param {Object[]} columns columns: Array of objects defining the columns. Each object should have:
 * @param {string} columns.id id: (string) Unique identifier for the column.
 * @param {string} columns.label label: (string) Display name for the column.
 * @param {Object[]} rows rows: Array of objects representing the data to be displayed in the table.
 * @param {Array<string>} hideColumns hideColumns: Array of column IDs to hide, especially in mobile view.
 *
 * Example Usage:
 *
 * const columns = [
 *     { id: 'name', label: 'Name' },
 *     { id: 'email', label: 'Email' },
 *     { id: 'age', label: 'Age' },
 * ];
 *
 * const rows = [
 *     { name: 'John Doe', email: 'john@example.com', age: 30 },
 *     { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
 * ];
 *
 * <StaticTable columns={columns} rows={rows} hideColumns={['email']} />
 */

const StaticTable = ({ columns, rows, hideColumns = [] }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TableContainer component={Paper} sx={{ ...shadow }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) =>
                            !hideColumns.includes(column.id) || !isMobile ? (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ) : null
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedRows.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) =>
                                !hideColumns.includes(column.id) ||
                                !isMobile ? (
                                    <TableCell key={column.id}>
                                        {row[column.id]}
                                    </TableCell>
                                ) : null
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default StaticTable;
