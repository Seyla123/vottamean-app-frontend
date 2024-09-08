import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Checkbox,
    useMediaQuery,
    useTheme,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * SimpleTable Component
 *
 * This component renders a customizable table with optional pagination, row selection,
 * and action menu for each row.
 *
 * Props:
 * @param {Array} columns - Array of column objects: [{ field: 'id', headerName: 'ID' }, ...]
 * @param {Array} data - Array of data objects to be displayed in the table
 * @param {Function} onRowClick - Callback function when a row is clicked
 * @param {boolean} pagination - Whether to enable pagination
 * @param {Array} hiddenColumns - Array of column fields to hide
 * @param {Function} onEdit - Callback function when edit option is selected
 * @param {Function} onDelete - Callback function when delete option is selected
 *
 * Usage:
 * <SimpleTable
 *   columns={[{ field: 'id', headerName: 'ID' }, { field: 'name', headerName: 'Name' }]}
 *   data={[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]}
 *   pagination={true}
 *   hiddenColumns={['id']}
 *   onEdit={(row) => console.log('Edit', row)}
 *   onDelete={(row) => console.log('Delete', row)}
 * />
 */

const SimpleTable = ({
    columns,
    data,
    onRowClick,
    pagination,
    hiddenColumns = [],
    onEdit,
    onDelete,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCheckboxChange = row => {
        setSelectedRows(prevSelectedRows =>
            prevSelectedRows.includes(row)
                ? prevSelectedRows.filter(item => item !== row)
                : [...prevSelectedRows, row]
        );
    };

    const handleActionClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const handleEdit = () => {
        if (onEdit && activeRow) {
            onEdit(activeRow);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        if (onDelete && activeRow) {
            onDelete(activeRow);
        }
        handleMenuClose();
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
                        <TableCell padding='checkbox'>
                            <Checkbox
                                indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                                checked={selectedRows.length === data.length}
                                onChange={() => {
                                    if (selectedRows.length === data.length) {
                                        setSelectedRows([]);
                                    } else {
                                        setSelectedRows(data);
                                    }
                                }}
                            />
                        </TableCell>
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
                        <TableCell style={{ width: '100px' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData().map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            hover
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    checked={selectedRows.includes(row)}
                                    onChange={() => handleCheckboxChange(row)}
                                />
                            </TableCell>
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
                            <TableCell style={{ width: '48px', padding: '0 8px', textAlign: 'center' }}>
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleActionClick(e, row);
                                    }}
                                >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
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
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </TableContainer>
    );
};

export default SimpleTable;
