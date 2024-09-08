import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    useMediaQuery,
    useTheme,
} from '@mui/material';

const SimpleTable = ({
    columns,
    data,
    onRowClick,
    pagination,
    hiddenColumns = [],
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = () => {
        return pagination
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data;
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(
                            column =>
                                !hiddenColumns.includes(column.field) && (
                                    <TableCell
                                        key={column.field}
                                        sx={{
                                            display:
                                                isMobile &&
                                                hiddenColumns.includes(
                                                    column.field
                                                )
                                                    ? 'none'
                                                    : 'table-cell',
                                        }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData().map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            hover
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map(
                                column =>
                                    !hiddenColumns.includes(column.field) && (
                                        <TableCell
                                            key={column.field}
                                            sx={{
                                                display:
                                                    isMobile &&
                                                    hiddenColumns.includes(
                                                        column.field
                                                    )
                                                        ? 'none'
                                                        : 'table-cell',
                                            }}
                                        >
                                            {row[column.field]}
                                        </TableCell>
                                    )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {pagination && (
                <TablePagination
                    component='div'
                    count={data.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
        </TableContainer>
    );
};

export default SimpleTable;
